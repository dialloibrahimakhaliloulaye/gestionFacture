import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.GestionFactureClientModule),
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.GestionFactureArticleModule),
      },
      {
        path: 'facture-item',
        loadChildren: () => import('./facture-item/facture-item.module').then(m => m.GestionFactureFactureItemModule),
      },
      {
        path: 'facture',
        loadChildren: () => import('./facture/facture.module').then(m => m.GestionFactureFactureModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GestionFactureEntityModule {}
