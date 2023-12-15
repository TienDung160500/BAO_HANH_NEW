import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PhanLoaiChiTietTiepNhanService } from '../service/phan-loai-chi-tiet-tiep-nhan.service';
import { IPhanLoaiChiTietTiepNhan, PhanLoaiChiTietTiepNhan } from '../phan-loai-chi-tiet-tiep-nhan.model';
import { IDanhSachTinhTrang } from 'app/entities/danh-sach-tinh-trang/danh-sach-tinh-trang.model';
import { DanhSachTinhTrangService } from 'app/entities/danh-sach-tinh-trang/service/danh-sach-tinh-trang.service';

import { PhanLoaiChiTietTiepNhanUpdateComponent } from './phan-loai-chi-tiet-tiep-nhan-update.component';

describe('PhanLoaiChiTietTiepNhan Management Update Component', () => {
  let comp: PhanLoaiChiTietTiepNhanUpdateComponent;
  let fixture: ComponentFixture<PhanLoaiChiTietTiepNhanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let phanLoaiChiTietTiepNhanService: PhanLoaiChiTietTiepNhanService;
  let danhSachTinhTrangService: DanhSachTinhTrangService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PhanLoaiChiTietTiepNhanUpdateComponent],
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
      .overrideTemplate(PhanLoaiChiTietTiepNhanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PhanLoaiChiTietTiepNhanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    phanLoaiChiTietTiepNhanService = TestBed.inject(PhanLoaiChiTietTiepNhanService);
    danhSachTinhTrangService = TestBed.inject(DanhSachTinhTrangService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhSachTinhTrang query and add missing value', () => {
      const phanLoaiChiTietTiepNhan: IPhanLoaiChiTietTiepNhan = { id: 456 };
      const danhSachTinhTrang: IDanhSachTinhTrang = { id: 99027 };
      phanLoaiChiTietTiepNhan.danhSachTinhTrang = danhSachTinhTrang;

      const danhSachTinhTrangCollection: IDanhSachTinhTrang[] = [{ id: 56578 }];
      jest.spyOn(danhSachTinhTrangService, 'query').mockReturnValue(of(new HttpResponse({ body: danhSachTinhTrangCollection })));
      const additionalDanhSachTinhTrangs = [danhSachTinhTrang];
      const expectedCollection: IDanhSachTinhTrang[] = [...additionalDanhSachTinhTrangs, ...danhSachTinhTrangCollection];
      jest.spyOn(danhSachTinhTrangService, 'addDanhSachTinhTrangToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ phanLoaiChiTietTiepNhan });
      comp.ngOnInit();

      expect(danhSachTinhTrangService.query).toHaveBeenCalled();
      expect(danhSachTinhTrangService.addDanhSachTinhTrangToCollectionIfMissing).toHaveBeenCalledWith(
        danhSachTinhTrangCollection,
        ...additionalDanhSachTinhTrangs
      );
      expect(comp.danhSachTinhTrangsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const phanLoaiChiTietTiepNhan: IPhanLoaiChiTietTiepNhan = { id: 456 };
      const danhSachTinhTrang: IDanhSachTinhTrang = { id: 76147 };
      phanLoaiChiTietTiepNhan.danhSachTinhTrang = danhSachTinhTrang;

      activatedRoute.data = of({ phanLoaiChiTietTiepNhan });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(phanLoaiChiTietTiepNhan));
      expect(comp.danhSachTinhTrangsSharedCollection).toContain(danhSachTinhTrang);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhanLoaiChiTietTiepNhan>>();
      const phanLoaiChiTietTiepNhan = { id: 123 };
      jest.spyOn(phanLoaiChiTietTiepNhanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanLoaiChiTietTiepNhan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: phanLoaiChiTietTiepNhan }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(phanLoaiChiTietTiepNhanService.update).toHaveBeenCalledWith(phanLoaiChiTietTiepNhan);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhanLoaiChiTietTiepNhan>>();
      const phanLoaiChiTietTiepNhan = new PhanLoaiChiTietTiepNhan();
      jest.spyOn(phanLoaiChiTietTiepNhanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanLoaiChiTietTiepNhan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: phanLoaiChiTietTiepNhan }));
      saveSubject.complete();

      // THEN
      expect(phanLoaiChiTietTiepNhanService.create).toHaveBeenCalledWith(phanLoaiChiTietTiepNhan);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhanLoaiChiTietTiepNhan>>();
      const phanLoaiChiTietTiepNhan = { id: 123 };
      jest.spyOn(phanLoaiChiTietTiepNhanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanLoaiChiTietTiepNhan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(phanLoaiChiTietTiepNhanService.update).toHaveBeenCalledWith(phanLoaiChiTietTiepNhan);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDanhSachTinhTrangById', () => {
      it('Should return tracked DanhSachTinhTrang primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDanhSachTinhTrangById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
