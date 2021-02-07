import { Moment } from 'moment';

export interface IClient {
  id?: number;
  nomComplet?: string;
  dateNaissance?: Moment;
  adresse?: string;
  telephone?: string;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public nomComplet?: string,
    public dateNaissance?: Moment,
    public adresse?: string,
    public telephone?: string
  ) {}
}
