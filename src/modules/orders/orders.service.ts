import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapter } from '../../common/adapters';
import { ItemResponse } from '../../common/types';

@Injectable()
export class OrdersService {
  logger = new Logger('OrdersService');

  constructor(
    private readonly configService: ConfigService,
    private readonly httpAdapter: HttpAdapter,
  ) {}

  async getOrders(items: { url_name: string }[] = []) {
    try {
      const MAX_CONCURRENCY = this.configService.get('MAX_CONCURRENCY');
      const results = [];
      let currentIndex = 0;

      const makeRequest = async () => {
        if (currentIndex < items.length) {
          const { url_name } = items[currentIndex];

          try {
            const orders = await this.httpAdapter.get<ItemResponse>(
              `${this.configService.get(
                'MARKET_BASE_URL',
              )}/items/${url_name}/orders`,
            );

            await this.delay(1000 / MAX_CONCURRENCY);

            results.push({
              item: url_name,
              orders,
            });
          } catch (error) {
            this.logger.error(error);
            results.push(null);
          }

          currentIndex++;
          await makeRequest();
        }
      };

      const requests = Array.from({ length: MAX_CONCURRENCY }, () =>
        makeRequest(),
      );
      await Promise.all(requests);

      return results;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
