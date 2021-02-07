import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactureItem } from 'app/shared/model/facture-item.model';

@Component({
  selector: 'jhi-facture-item-detail',
  templateUrl: './facture-item-detail.component.html',
})
export class FactureItemDetailComponent implements OnInit {
  factureItem: IFactureItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ factureItem }) => (this.factureItem = factureItem));
  }

  previousState(): void {
    window.history.back();
  }
}
