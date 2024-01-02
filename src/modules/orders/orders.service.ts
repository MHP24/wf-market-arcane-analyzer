import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapter } from '../../common/adapters';
import { Order, OrderResponse } from 'src/common/types/order';
import { Item } from 'src/common/types';

@Injectable()
export class OrdersService {
  logger = new Logger('OrdersService');

  constructor(
    private readonly configService: ConfigService,
    private readonly httpAdapter: HttpAdapter,
  ) {}

  async getOrders(items: Item[] = []) {
    const MAX_CONCURRENCY = this.configService.get('MAX_CONCURRENCY');
    const results = [];

    for (const { url_name, ...rest } of items) {
      try {
        const orders = await this.httpAdapter.get<OrderResponse>(
          `${this.configService.get(
            'MARKET_BASE_URL',
          )}/items/${url_name}/orders`,
        );

        this.logger.log(
          `${this.configService.get(
            'MARKET_BASE_URL',
          )}/items/${url_name}/orders`,
        );

        await this.delay(1000 / MAX_CONCURRENCY);

        results.push({
          item: url_name,
          price: this.calcPrices(orders.payload.orders),
          ...rest,
        });
      } catch (error) {
        this.logger.error(error);
        results.push(null);
      }
    }

    return results;
  }

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
    const highest = Math.max(...prices);
    const current = Math.min(...prices);

    const avg =
      prices.reduce((acc: number, price: number) => {
        acc += price;
        return acc;
      }, 0) / prices.length;

    return { highest, current, avg: Math.round(avg) };
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
