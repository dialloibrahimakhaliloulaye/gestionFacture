import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFactureItem, FactureItem } from 'app/shared/model/facture-item.model';
import { FactureItemService } from './facture-item.service';
import { FactureItemComponent } from './facture-item.component';
import { FactureItemDetailComponent } from './facture-item-detail.component';
import { FactureItemUpdateComponent } from './facture-item-update.component';

@Injectable({ providedIn: 'root' })
export class FactureItemResolve implements Resolve<IFactureItem> {
  constructor(private service: FactureItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFactureItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((factureItem: HttpResponse<FactureItem>) => {
          if (factureItem.body) {
            return of(factureItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FactureItem());
  }
}

export const factureItemRoute: Routes = [
  {
    path: '',
    component: FactureItemComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gestionFactureApp.factureItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FactureItemDetailComponent,
    resolve: {
      factureItem: FactureItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionFactureApp.factureItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FactureItemUpdateComponent,
    resolve: {
      factureItem: FactureItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionFactureApp.factureItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FactureItemUpdateComponent,
    resolve: {
      factureItem: FactureItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionFactureApp.factureItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
