export interface OrderResponse {
  payload: Payload;
}

export interface Payload {
  orders: Order[];
}

export interface Order {
  order_type: OrderType;
  quantity: number;
  platinum: number;
  user: User;
  platform: Platform;
  creation_date: string;
  last_update: string;
  visible: boolean;
  id: string;
  mod_rank?: number;
  region: Region;
}

export enum OrderType {
  Buy = 'buy',
  Sell = 'sell',
}

export enum Platform {
  PC = 'pc',
}

export enum Region {
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Pt = 'pt',
  Ru = 'ru',
}

export interface User {
  reputation: number;
  locale: Region;
  avatar: null | string;
  last_seen: string;
  ingame_name: string;
  id: string;
  region: Region;
  status: Status;
}

export enum Status {
  Ingame = 'ingame',
  Offline = 'offline',
  Online = 'online',
}
