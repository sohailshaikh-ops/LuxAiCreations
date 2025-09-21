
export enum PortfolioCategory {
  ALL = 'All',
  SIXTEEN_NINE = '16:9',
  NINE_SIXTEEN = '9:16',
  ONE_ONE = '1:1',
}

export interface PortfolioItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  title: string;
  category: PortfolioCategory;
}
