import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPhanLoaiChiTietTiepNhan, PhanLoaiChiTietTiepNhan } from '../phan-loai-chi-tiet-tiep-nhan.model';
import { PhanLoaiChiTietTiepNhanService } from '../service/phan-loai-chi-tiet-tiep-nhan.service';
import { IDanhSachTinhTrang } from 'app/entities/danh-sach-tinh-trang/danh-sach-tinh-trang.model';
import { DanhSachTinhTrangService } from 'app/entities/danh-sach-tinh-trang/service/danh-sach-tinh-trang.service';

@Component({
  selector: 'jhi-phan-loai-chi-tiet-tiep-nhan-update',
  templateUrl: './phan-loai-chi-tiet-tiep-nhan-update.component.html',
})
export class PhanLoaiChiTietTiepNhanUpdateComponent implements OnInit {
  isSaving = false;

  danhSachTinhTrangsSharedCollection: IDanhSachTinhTrang[] = [];

  editForm = this.fb.group({
    id: [],
    soLuong: [],
    danhSachTinhTrang: [],
  });

  constructor(
    protected phanLoaiChiTietTiepNhanService: PhanLoaiChiTietTiepNhanService,
    protected danhSachTinhTrangService: DanhSachTinhTrangService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ phanLoaiChiTietTiepNhan }) => {
      this.updateForm(phanLoaiChiTietTiepNhan);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const phanLoaiChiTietTiepNhan = this.createFromForm();
    if (phanLoaiChiTietTiepNhan.id !== undefined) {
      this.subscribeToSaveResponse(this.phanLoaiChiTietTiepNhanService.update(phanLoaiChiTietTiepNhan));
    } else {
      this.subscribeToSaveResponse(this.phanLoaiChiTietTiepNhanService.create(phanLoaiChiTietTiepNhan));
    }
  }

  trackDanhSachTinhTrangById(_index: number, item: IDanhSachTinhTrang): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhanLoaiChiTietTiepNhan>>): void {
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

  protected updateForm(phanLoaiChiTietTiepNhan: IPhanLoaiChiTietTiepNhan): void {
    this.editForm.patchValue({
      id: phanLoaiChiTietTiepNhan.id,
      soLuong: phanLoaiChiTietTiepNhan.soLuong,
      danhSachTinhTrang: phanLoaiChiTietTiepNhan.danhSachTinhTrang,
    });

    this.danhSachTinhTrangsSharedCollection = this.danhSachTinhTrangService.addDanhSachTinhTrangToCollectionIfMissing(
      this.danhSachTinhTrangsSharedCollection,
      phanLoaiChiTietTiepNhan.danhSachTinhTrang
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhSachTinhTrangService
      .query()
      .pipe(map((res: HttpResponse<IDanhSachTinhTrang[]>) => res.body ?? []))
      .pipe(
        map((danhSachTinhTrangs: IDanhSachTinhTrang[]) =>
          this.danhSachTinhTrangService.addDanhSachTinhTrangToCollectionIfMissing(
            danhSachTinhTrangs,
            this.editForm.get('danhSachTinhTrang')!.value
          )
        )
      )
      .subscribe((danhSachTinhTrangs: IDanhSachTinhTrang[]) => (this.danhSachTinhTrangsSharedCollection = danhSachTinhTrangs));
  }

  protected createFromForm(): IPhanLoaiChiTietTiepNhan {
    return {
      ...new PhanLoaiChiTietTiepNhan(),
      id: this.editForm.get(['id'])!.value,
      soLuong: this.editForm.get(['soLuong'])!.value,
      danhSachTinhTrang: this.editForm.get(['danhSachTinhTrang'])!.value,
    };
  }
}
