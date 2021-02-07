import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionFactureTestModule } from '../../../test.module';
import { FactureItemUpdateComponent } from 'app/entities/facture-item/facture-item-update.component';
import { FactureItemService } from 'app/entities/facture-item/facture-item.service';
import { FactureItem } from 'app/shared/model/facture-item.model';

describe('Component Tests', () => {
  describe('FactureItem Management Update Component', () => {
    let comp: FactureItemUpdateComponent;
    let fixture: ComponentFixture<FactureItemUpdateComponent>;
    let service: FactureItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionFactureTestModule],
        declarations: [FactureItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FactureItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FactureItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FactureItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FactureItem(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new FactureItem();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
