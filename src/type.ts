export type TcgResponse<T> = {
  data: T[];
  pageSize: number;
  totalCount: number;
  page: number;
};

export type TcgArgs = {
  q?: string;
  page?: number;
  pageSize?: number;
};

export type TcgHeaders = {
  "X-Api-Key"?: string;
};

export type TcgQueryBuilder<T> = {
  find: (id: string) => Promise<T>;
  where: (args: TcgArgs) => Promise<TcgResponse<T>>;
  all: (args?: TcgArgs, data?: T[]) => Promise<T[]>;
};
