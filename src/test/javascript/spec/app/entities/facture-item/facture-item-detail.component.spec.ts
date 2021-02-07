import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionFactureTestModule } from '../../../test.module';
import { FactureItemDetailComponent } from 'app/entities/facture-item/facture-item-detail.component';
import { FactureItem } from 'app/shared/model/facture-item.model';

describe('Component Tests', () => {
  describe('FactureItem Management Detail Component', () => {
    let comp: FactureItemDetailComponent;
    let fixture: ComponentFixture<FactureItemDetailComponent>;
    const route = ({ data: of({ factureItem: new FactureItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionFactureTestModule],
        declarations: [FactureItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FactureItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FactureItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load factureItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.factureItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
