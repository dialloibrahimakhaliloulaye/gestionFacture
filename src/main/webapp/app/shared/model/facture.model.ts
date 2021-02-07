import { Moment } from 'moment';
import { IFactureItem } from 'app/shared/model/facture-item.model';

export interface IFacture {
  id?: number;
  dateCreation?: Moment;
  dateEcheance?: Moment;
  statut?: string;
  factureItem?: IFactureItem;
}

export class Facture implements IFacture {
  constructor(
    public id?: number,
    public dateCreation?: Moment,
    public dateEcheance?: Moment,
    public statut?: string,
    public factureItem?: IFactureItem
  ) {}
}
