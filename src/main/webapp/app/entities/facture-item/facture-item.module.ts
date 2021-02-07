import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionFactureSharedModule } from 'app/shared/shared.module';
import { FactureItemComponent } from './facture-item.component';
import { FactureItemDetailComponent } from './facture-item-detail.component';
import { FactureItemUpdateComponent } from './facture-item-update.component';
import { FactureItemDeleteDialogComponent } from './facture-item-delete-dialog.component';
import { factureItemRoute } from './facture-item.route';

@NgModule({
  imports: [GestionFactureSharedModule, RouterModule.forChild(factureItemRoute)],
  declarations: [FactureItemComponent, FactureItemDetailComponent, FactureItemUpdateComponent, FactureItemDeleteDialogComponent],
  entryComponents: [FactureItemDeleteDialogComponent],
})
export class GestionFactureFactureItemModule {}
