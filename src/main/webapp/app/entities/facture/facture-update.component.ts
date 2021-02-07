import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFacture, Facture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';
import { IFactureItem } from 'app/shared/model/facture-item.model';
import { FactureItemService } from 'app/entities/facture-item/facture-item.service';

@Component({
  selector: 'jhi-facture-update',
  templateUrl: './facture-update.component.html',
})
export class FactureUpdateComponent implements OnInit {
  isSaving = false;
  factureitems: IFactureItem[] = [];
  dateEcheanceDp: any;

  editForm = this.fb.group({
    id: [],
    dateCreation: [],
    dateEcheance: [],
    statut: [null, [Validators.required]],
    factureItem: [],
  });

  constructor(
    protected factureService: FactureService,
    protected factureItemService: FactureItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facture }) => {
      if (!facture.id) {
        const today = moment().startOf('day');
        facture.dateCreation = today;
      }

      this.updateForm(facture);

      this.factureItemService.query().subscribe((res: HttpResponse<IFactureItem[]>) => (this.factureitems = res.body || []));
    });
  }

  updateForm(facture: IFacture): void {
    this.editForm.patchValue({
      id: facture.id,
      dateCreation: facture.dateCreation ? facture.dateCreation.format(DATE_TIME_FORMAT) : null,
      dateEcheance: facture.dateEcheance,
      statut: facture.statut,
      factureItem: facture.factureItem,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facture = this.createFromForm();
    if (facture.id !== undefined) {
      this.subscribeToSaveResponse(this.factureService.update(facture));
    } else {
      this.subscribeToSaveResponse(this.factureService.create(facture));
    }
  }

  private createFromForm(): IFacture {
    return {
      ...new Facture(),
      id: this.editForm.get(['id'])!.value,
      dateCreation: this.editForm.get(['dateCreation'])!.value
        ? moment(this.editForm.get(['dateCreation'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateEcheance: this.editForm.get(['dateEcheance'])!.value,
      statut: this.editForm.get(['statut'])!.value,
      factureItem: this.editForm.get(['factureItem'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>): void {
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

  trackById(index: number, item: IFactureItem): any {
    return item.id;
  }
}
