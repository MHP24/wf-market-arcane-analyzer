export interface ItemResponse {
  payload: ItemPayload;
}

export interface ItemPayload {
  items: Item[];
}

export interface Item {
  item_name: string;
  thumb: string;
  url_name: string;
  id: string;
  vaulted?: boolean;
}
