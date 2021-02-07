import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFactureItem } from 'app/shared/model/facture-item.model';

type EntityResponseType = HttpResponse<IFactureItem>;
type EntityArrayResponseType = HttpResponse<IFactureItem[]>;

@Injectable({ providedIn: 'root' })
export class FactureItemService {
  public resourceUrl = SERVER_API_URL + 'api/facture-items';

  constructor(protected http: HttpClient) {}

  create(factureItem: IFactureItem): Observable<EntityResponseType> {
    return this.http.post<IFactureItem>(this.resourceUrl, factureItem, { observe: 'response' });
  }

  update(factureItem: IFactureItem): Observable<EntityResponseType> {
    return this.http.put<IFactureItem>(this.resourceUrl, factureItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFactureItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFactureItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
