import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpAdapter {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, payload: unknown = {}): Promise<T> {
    const { data } = await this.httpService.axiosRef.get<T>(url, payload);
    return data;
  }
}
