import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFactureItem, FactureItem } from 'app/shared/model/facture-item.model';
import { FactureItemService } from './facture-item.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article/article.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

type SelectableEntity = IArticle | IClient;

@Component({
  selector: 'jhi-facture-item-update',
  templateUrl: './facture-item-update.component.html',
})
export class FactureItemUpdateComponent implements OnInit {
  isSaving = false;
  articles: IArticle[] = [];
  clients: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    quantite: [null, [Validators.required]],
    total: [],
    article: [],
    client: [],
  });

  constructor(
    protected factureItemService: FactureItemService,
    protected articleService: ArticleService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ factureItem }) => {
      this.updateForm(factureItem);

      this.articleService.query().subscribe((res: HttpResponse<IArticle[]>) => (this.articles = res.body || []));

      this.clientService.query().subscribe((res: HttpResponse<IClient[]>) => (this.clients = res.body || []));
    });
  }

  updateForm(factureItem: IFactureItem): void {
    this.editForm.patchValue({
      id: factureItem.id,
      quantite: factureItem.quantite,
      total: factureItem.total,
      article: factureItem.article,
      client: factureItem.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const factureItem = this.createFromForm();
    if (factureItem.id !== undefined) {
      this.subscribeToSaveResponse(this.factureItemService.update(factureItem));
    } else {
      this.subscribeToSaveResponse(this.factureItemService.create(factureItem));
    }
  }

  private createFromForm(): IFactureItem {
    return {
      ...new FactureItem(),
      id: this.editForm.get(['id'])!.value,
      quantite: this.editForm.get(['quantite'])!.value,
      total: this.editForm.get(['total'])!.value,
      article: this.editForm.get(['article'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFactureItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
