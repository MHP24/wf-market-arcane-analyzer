import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ItemResponse } from '../../common/types';
import { HttpAdapter } from '../../common/adapters';
import { OrdersService } from '../orders/orders.service';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class ArcanesService {
  logger = new Logger('ArcanesService');

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly configService: ConfigService,
    private readonly ordersService: OrdersService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll() {
    try {
      return await this.prismaService.marketItem.findMany({
        orderBy: {
          currentPrice: 'desc',
        },
      });
    } catch (error) {
      return new InternalServerErrorException('Unexpected error :(');
    }
  }

  async getAll() {
    try {
      const {
        payload: { items },
      } = await this.httpAdapter.get<ItemResponse>(
        `${this.configService.get('MARKET_BASE_URL')}/items`,
      );

      const arcanes = items.filter(
        ({ url_name }) =>
          url_name.split('_').length < 3 && url_name.match(/^arcane/),
      );

      await this.ordersService.handleOrders(arcanes);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
