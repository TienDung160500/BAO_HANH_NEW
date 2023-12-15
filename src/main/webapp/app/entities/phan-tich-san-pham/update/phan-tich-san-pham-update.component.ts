import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IPhanTichSanPham, PhanTichSanPham } from '../phan-tich-san-pham.model';
import { PhanTichSanPhamService } from '../service/phan-tich-san-pham.service';
import { IChiTietSanPhamTiepNhan } from 'app/entities/chi-tiet-san-pham-tiep-nhan/chi-tiet-san-pham-tiep-nhan.model';
import { ChiTietSanPhamTiepNhanService } from 'app/entities/chi-tiet-san-pham-tiep-nhan/service/chi-tiet-san-pham-tiep-nhan.service';

@Component({
  selector: 'jhi-phan-tich-san-pham-update',
  templateUrl: './phan-tich-san-pham-update.component.html',
})
export class PhanTichSanPhamUpdateComponent implements OnInit {
  isSaving = false;

  chiTietSanPhamTiepNhansSharedCollection: IChiTietSanPhamTiepNhan[] = [];

  editForm = this.fb.group({
    id: [],
    tenNhanVienPhanTich: [],
    theLoaiPhanTich: [],
    lotNumber: [],
    detail: [],
    soLuong: [],
    ngayKiemTra: [],
    username: [],
    namSanXuat: [],
    trangThai: [],
    chiTietSanPhamTiepNhan: [],
  });

  constructor(
    protected phanTichSanPhamService: PhanTichSanPhamService,
    protected chiTietSanPhamTiepNhanService: ChiTietSanPhamTiepNhanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ phanTichSanPham }) => {
      if (phanTichSanPham.id === undefined) {
        const today = dayjs().startOf('day');
        phanTichSanPham.ngayKiemTra = today;
      }

      this.updateForm(phanTichSanPham);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const phanTichSanPham = this.createFromForm();
    if (phanTichSanPham.id !== undefined) {
      this.subscribeToSaveResponse(this.phanTichSanPhamService.update(phanTichSanPham));
    } else {
      this.subscribeToSaveResponse(this.phanTichSanPhamService.create(phanTichSanPham));
    }
  }

  trackChiTietSanPhamTiepNhanById(_index: number, item: IChiTietSanPhamTiepNhan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhanTichSanPham>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(phanTichSanPham: IPhanTichSanPham): void {
    this.editForm.patchValue({
      id: phanTichSanPham.id,
      tenNhanVienPhanTich: phanTichSanPham.tenNhanVienPhanTich,
      theLoaiPhanTich: phanTichSanPham.theLoaiPhanTich,
      lotNumber: phanTichSanPham.lotNumber,
      detail: phanTichSanPham.detail,
      soLuong: phanTichSanPham.soLuong,
      ngayKiemTra: phanTichSanPham.ngayKiemTra ? phanTichSanPham.ngayKiemTra.format(DATE_TIME_FORMAT) : null,
      username: phanTichSanPham.username,
      namSanXuat: phanTichSanPham.namSanXuat,
      trangThai: phanTichSanPham.trangThai,
      chiTietSanPhamTiepNhan: phanTichSanPham.chiTietSanPhamTiepNhan,
    });

    this.chiTietSanPhamTiepNhansSharedCollection = this.chiTietSanPhamTiepNhanService.addChiTietSanPhamTiepNhanToCollectionIfMissing(
      this.chiTietSanPhamTiepNhansSharedCollection,
      phanTichSanPham.chiTietSanPhamTiepNhan
    );
  }

  protected loadRelationshipsOptions(): void {
    this.chiTietSanPhamTiepNhanService
      .query()
      .pipe(map((res: HttpResponse<IChiTietSanPhamTiepNhan[]>) => res.body ?? []))
      .pipe(
        map((chiTietSanPhamTiepNhans: IChiTietSanPhamTiepNhan[]) =>
          this.chiTietSanPhamTiepNhanService.addChiTietSanPhamTiepNhanToCollectionIfMissing(
            chiTietSanPhamTiepNhans,
            this.editForm.get('chiTietSanPhamTiepNhan')!.value
          )
        )
      )
      .subscribe(
        (chiTietSanPhamTiepNhans: IChiTietSanPhamTiepNhan[]) => (this.chiTietSanPhamTiepNhansSharedCollection = chiTietSanPhamTiepNhans)
      );
  }

  protected createFromForm(): IPhanTichSanPham {
    return {
      ...new PhanTichSanPham(),
      id: this.editForm.get(['id'])!.value,
      tenNhanVienPhanTich: this.editForm.get(['tenNhanVienPhanTich'])!.value,
      theLoaiPhanTich: this.editForm.get(['theLoaiPhanTich'])!.value,
      lotNumber: this.editForm.get(['lotNumber'])!.value,
      detail: this.editForm.get(['detail'])!.value,
      soLuong: this.editForm.get(['soLuong'])!.value,
      ngayKiemTra: this.editForm.get(['ngayKiemTra'])!.value
        ? dayjs(this.editForm.get(['ngayKiemTra'])!.value, DATE_TIME_FORMAT)
        : undefined,
      username: this.editForm.get(['username'])!.value,
      namSanXuat: this.editForm.get(['namSanXuat'])!.value,
      trangThai: this.editForm.get(['trangThai'])!.value,
      chiTietSanPhamTiepNhan: this.editForm.get(['chiTietSanPhamTiepNhan'])!.value,
    };
  }
}
