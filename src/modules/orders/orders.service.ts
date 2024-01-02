import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapter } from '../../common/adapters';
import { Order, OrderResponse } from 'src/common/types/order';
import { Item, ItemOrder } from 'src/common/types';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class OrdersService {
  logger = new Logger('OrdersService');

  constructor(
    private readonly configService: ConfigService,
    private readonly httpAdapter: HttpAdapter,
    private readonly prismaService: PrismaService,
  ) {}

  async handleOrders(items: Item[] = []) {
    const MAX_CONCURRENCY = this.configService.get('MAX_CONCURRENCY');

    for (const { url_name, item_name, ...rest } of items) {
      try {
        const orders = await this.httpAdapter.get<OrderResponse>(
          `${this.configService.get(
            'MARKET_API_BASE_URL',
          )}/items/${url_name}/orders`,
        );

        this.logger.log(
          `${this.configService.get(
            'MARKET_API_BASE_URL',
          )}/items/${url_name}/orders`,
        );
        await this.delay(1000 / MAX_CONCURRENCY);

        const itemOrder: ItemOrder = {
          slug: url_name,
          ...rest,
          ...this.calcPrices(orders.payload.orders),
          name: item_name,
          thumb: `${this.configService.get('MARKET_BASE_URL')}/static/assets/${
            rest.thumb
          }`,
        };

        await this.updateOrderByItem(itemOrder);
      } catch (error) {
        this.logger.error(error);
      }
    }
  }

  // * New data obtained from REST Service into database
  async updateOrderByItem(item: ItemOrder) {
    await this.prismaService.marketItem.upsert({
      where: {
        id: item.id,
      },
      create: item,
      update: item,
    });
  }

  // * Prices obtained using the max rank for the item
  calcPrices(orders: Order[]) {
    const modRanks = orders.map(({ mod_rank }) => mod_rank);

    const ranks = {
      minRank: Math.min(...modRanks),
      maxRank: Math.max(...modRanks),
    };

    orders = orders.filter(
      ({ user: { status }, order_type, mod_rank }) =>
        status === 'ingame' &&
        order_type === 'sell' &&
        mod_rank &&
        mod_rank === ranks.maxRank,
    );

    const prices = orders.map((order) => order.platinum);
    const highestPrice = Math.max(...prices);
    const currentPrice = Math.min(...prices);

    const avg =
      prices.reduce((acc: number, price: number) => {
        acc += price;
        return acc;
      }, 0) / prices.length;

    return { highestPrice, currentPrice, averagePrice: Math.round(avg) };
  }

  // * Delay for HTTP requests
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
