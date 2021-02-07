export interface IArticle {
  id?: number;
  libelle?: string;
  description?: any;
  prix?: number;
}

export class Article implements IArticle {
  constructor(public id?: number, public libelle?: string, public description?: any, public prix?: number) {}
}
