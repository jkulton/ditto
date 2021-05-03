export interface KVKey {
  expiration?: number;
  metadata?: unknown;
  name: string;
}

export interface Action {
  validator?: Function;
  handler: Function;
}

export interface ActionList {
  [key: string]: Action;
}

export interface RequestContext {
  contentType: string;
  path: string;
  body: string;
  store: Store;
  url: string;
}

export interface Store {
  put(key: string, value: string);
  delete(key: string);
  get(key: string);
  list();
}

export interface Result {
  data?: string;
  error?: string;
  status?: number;
}
