import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PhanTichSanPhamService } from '../service/phan-tich-san-pham.service';
import { IPhanTichSanPham, PhanTichSanPham } from '../phan-tich-san-pham.model';
import { IChiTietSanPhamTiepNhan } from 'app/entities/chi-tiet-san-pham-tiep-nhan/chi-tiet-san-pham-tiep-nhan.model';
import { ChiTietSanPhamTiepNhanService } from 'app/entities/chi-tiet-san-pham-tiep-nhan/service/chi-tiet-san-pham-tiep-nhan.service';

import { PhanTichSanPhamUpdateComponent } from './phan-tich-san-pham-update.component';

describe('PhanTichSanPham Management Update Component', () => {
  let comp: PhanTichSanPhamUpdateComponent;
  let fixture: ComponentFixture<PhanTichSanPhamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let phanTichSanPhamService: PhanTichSanPhamService;
  let chiTietSanPhamTiepNhanService: ChiTietSanPhamTiepNhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PhanTichSanPhamUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PhanTichSanPhamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PhanTichSanPhamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    phanTichSanPhamService = TestBed.inject(PhanTichSanPhamService);
    chiTietSanPhamTiepNhanService = TestBed.inject(ChiTietSanPhamTiepNhanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ChiTietSanPhamTiepNhan query and add missing value', () => {
      const phanTichSanPham: IPhanTichSanPham = { id: 456 };
      const chiTietSanPhamTiepNhan: IChiTietSanPhamTiepNhan = { id: 44865 };
      phanTichSanPham.chiTietSanPhamTiepNhan = chiTietSanPhamTiepNhan;

      const chiTietSanPhamTiepNhanCollection: IChiTietSanPhamTiepNhan[] = [{ id: 9748 }];
      jest.spyOn(chiTietSanPhamTiepNhanService, 'query').mockReturnValue(of(new HttpResponse({ body: chiTietSanPhamTiepNhanCollection })));
      const additionalChiTietSanPhamTiepNhans = [chiTietSanPhamTiepNhan];
      const expectedCollection: IChiTietSanPhamTiepNhan[] = [...additionalChiTietSanPhamTiepNhans, ...chiTietSanPhamTiepNhanCollection];
      jest.spyOn(chiTietSanPhamTiepNhanService, 'addChiTietSanPhamTiepNhanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ phanTichSanPham });
      comp.ngOnInit();

      expect(chiTietSanPhamTiepNhanService.query).toHaveBeenCalled();
      expect(chiTietSanPhamTiepNhanService.addChiTietSanPhamTiepNhanToCollectionIfMissing).toHaveBeenCalledWith(
        chiTietSanPhamTiepNhanCollection,
        ...additionalChiTietSanPhamTiepNhans
      );
      expect(comp.chiTietSanPhamTiepNhansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const phanTichSanPham: IPhanTichSanPham = { id: 456 };
      const chiTietSanPhamTiepNhan: IChiTietSanPhamTiepNhan = { id: 9359 };
      phanTichSanPham.chiTietSanPhamTiepNhan = chiTietSanPhamTiepNhan;

      activatedRoute.data = of({ phanTichSanPham });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(phanTichSanPham));
      expect(comp.chiTietSanPhamTiepNhansSharedCollection).toContain(chiTietSanPhamTiepNhan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhanTichSanPham>>();
      const phanTichSanPham = { id: 123 };
      jest.spyOn(phanTichSanPhamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanTichSanPham });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: phanTichSanPham }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(phanTichSanPhamService.update).toHaveBeenCalledWith(phanTichSanPham);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhanTichSanPham>>();
      const phanTichSanPham = new PhanTichSanPham();
      jest.spyOn(phanTichSanPhamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanTichSanPham });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: phanTichSanPham }));
      saveSubject.complete();

      // THEN
      expect(phanTichSanPhamService.create).toHaveBeenCalledWith(phanTichSanPham);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhanTichSanPham>>();
      const phanTichSanPham = { id: 123 };
      jest.spyOn(phanTichSanPhamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanTichSanPham });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(phanTichSanPhamService.update).toHaveBeenCalledWith(phanTichSanPham);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackChiTietSanPhamTiepNhanById', () => {
      it('Should return tracked ChiTietSanPhamTiepNhan primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackChiTietSanPhamTiepNhanById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
