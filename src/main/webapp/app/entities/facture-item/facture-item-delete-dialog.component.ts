import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFactureItem } from 'app/shared/model/facture-item.model';
import { FactureItemService } from './facture-item.service';

@Component({
  templateUrl: './facture-item-delete-dialog.component.html',
})
export class FactureItemDeleteDialogComponent {
  factureItem?: IFactureItem;

  constructor(
    protected factureItemService: FactureItemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.factureItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('factureItemListModification');
      this.activeModal.close();
    });
  }
}
