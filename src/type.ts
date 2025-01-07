export type TcgResponse = {
  data: any;
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
