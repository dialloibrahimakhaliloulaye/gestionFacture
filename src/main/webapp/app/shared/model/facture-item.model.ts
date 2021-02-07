import { IArticle } from 'app/shared/model/article.model';
import { IClient } from 'app/shared/model/client.model';

export interface IFactureItem {
  id?: number;
  quantite?: number;
  total?: number;
  article?: IArticle;
  client?: IClient;
}

export class FactureItem implements IFactureItem {
  constructor(public id?: number, public quantite?: number, public total?: number, public article?: IArticle, public client?: IClient) {}
}
