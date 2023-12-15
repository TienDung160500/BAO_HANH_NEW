import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IChiTietSanPhamTiepNhan, ChiTietSanPhamTiepNhan } from '../chi-tiet-san-pham-tiep-nhan.model';
import { ChiTietSanPhamTiepNhanService } from '../service/chi-tiet-san-pham-tiep-nhan.service';
import { ISanPham } from 'app/entities/san-pham/san-pham.model';
import { SanPhamService } from 'app/entities/san-pham/service/san-pham.service';
import { IDonBaoHanh } from 'app/entities/don-bao-hanh/don-bao-hanh.model';
import { DonBaoHanhService } from 'app/entities/don-bao-hanh/service/don-bao-hanh.service';
import { IPhanLoaiChiTietTiepNhan } from 'app/entities/phan-loai-chi-tiet-tiep-nhan/phan-loai-chi-tiet-tiep-nhan.model';
import { PhanLoaiChiTietTiepNhanService } from 'app/entities/phan-loai-chi-tiet-tiep-nhan/service/phan-loai-chi-tiet-tiep-nhan.service';

@Component({
  selector: 'jhi-chi-tiet-san-pham-tiep-nhan-update',
  templateUrl: './chi-tiet-san-pham-tiep-nhan-update.component.html',
})
export class ChiTietSanPhamTiepNhanUpdateComponent implements OnInit {
  isSaving = false;

  sanPhamsSharedCollection: ISanPham[] = [];
  donBaoHanhsSharedCollection: IDonBaoHanh[] = [];
  phanLoaiChiTietTiepNhansSharedCollection: IPhanLoaiChiTietTiepNhan[] = [];

  editForm = this.fb.group({
    id: [],
    soLuongKhachHang: [],
    idKho: [],
    idBienBan: [],
    tongLoiKiThuat: [],
    tongLoiLinhDong: [],
    ngayPhanLoai: [],
    soLuong: [],
    tinhTrangBaoHanh: [],
    sanPham: [],
    donBaoHanh: [],
    phanLoaiChiTietTiepNhan: [],
  });

  constructor(
    protected chiTietSanPhamTiepNhanService: ChiTietSanPhamTiepNhanService,
    protected sanPhamService: SanPhamService,
    protected donBaoHanhService: DonBaoHanhService,
    protected phanLoaiChiTietTiepNhanService: PhanLoaiChiTietTiepNhanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietSanPhamTiepNhan }) => {
      if (chiTietSanPhamTiepNhan.id === undefined) {
        const today = dayjs().startOf('day');
        chiTietSanPhamTiepNhan.ngayPhanLoai = today;
      }

      this.updateForm(chiTietSanPhamTiepNhan);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chiTietSanPhamTiepNhan = this.createFromForm();
    if (chiTietSanPhamTiepNhan.id !== undefined) {
      this.subscribeToSaveResponse(this.chiTietSanPhamTiepNhanService.update(chiTietSanPhamTiepNhan));
    } else {
      this.subscribeToSaveResponse(this.chiTietSanPhamTiepNhanService.create(chiTietSanPhamTiepNhan));
    }
  }

  trackSanPhamById(_index: number, item: ISanPham): number {
    return item.id!;
  }

  trackDonBaoHanhById(_index: number, item: IDonBaoHanh): number {
    return item.id!;
  }

  trackPhanLoaiChiTietTiepNhanById(_index: number, item: IPhanLoaiChiTietTiepNhan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChiTietSanPhamTiepNhan>>): void {
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

  protected updateForm(chiTietSanPhamTiepNhan: IChiTietSanPhamTiepNhan): void {
    this.editForm.patchValue({
      id: chiTietSanPhamTiepNhan.id,
      soLuongKhachHang: chiTietSanPhamTiepNhan.soLuongKhachHang,
      idKho: chiTietSanPhamTiepNhan.idKho,
      idBienBan: chiTietSanPhamTiepNhan.idBienBan,
      tongLoiKiThuat: chiTietSanPhamTiepNhan.tongLoiKiThuat,
      tongLoiLinhDong: chiTietSanPhamTiepNhan.tongLoiLinhDong,
      ngayPhanLoai: chiTietSanPhamTiepNhan.ngayPhanLoai ? chiTietSanPhamTiepNhan.ngayPhanLoai.format(DATE_TIME_FORMAT) : null,
      soLuong: chiTietSanPhamTiepNhan.soLuong,
      tinhTrangBaoHanh: chiTietSanPhamTiepNhan.tinhTrangBaoHanh,
      sanPham: chiTietSanPhamTiepNhan.sanPham,
      donBaoHanh: chiTietSanPhamTiepNhan.donBaoHanh,
      phanLoaiChiTietTiepNhan: chiTietSanPhamTiepNhan.phanLoaiChiTietTiepNhan,
    });

    this.sanPhamsSharedCollection = this.sanPhamService.addSanPhamToCollectionIfMissing(
      this.sanPhamsSharedCollection,
      chiTietSanPhamTiepNhan.sanPham
    );
    this.donBaoHanhsSharedCollection = this.donBaoHanhService.addDonBaoHanhToCollectionIfMissing(
      this.donBaoHanhsSharedCollection,
      chiTietSanPhamTiepNhan.donBaoHanh
    );
    this.phanLoaiChiTietTiepNhansSharedCollection = this.phanLoaiChiTietTiepNhanService.addPhanLoaiChiTietTiepNhanToCollectionIfMissing(
      this.phanLoaiChiTietTiepNhansSharedCollection,
      chiTietSanPhamTiepNhan.phanLoaiChiTietTiepNhan
    );
  }

  protected loadRelationshipsOptions(): void {
    this.sanPhamService
      .query()
      .pipe(map((res: HttpResponse<ISanPham[]>) => res.body ?? []))
      .pipe(
        map((sanPhams: ISanPham[]) => this.sanPhamService.addSanPhamToCollectionIfMissing(sanPhams, this.editForm.get('sanPham')!.value))
      )
      .subscribe((sanPhams: ISanPham[]) => (this.sanPhamsSharedCollection = sanPhams));

    this.donBaoHanhService
      .query()
      .pipe(map((res: HttpResponse<IDonBaoHanh[]>) => res.body ?? []))
      .pipe(
        map((donBaoHanhs: IDonBaoHanh[]) =>
          this.donBaoHanhService.addDonBaoHanhToCollectionIfMissing(donBaoHanhs, this.editForm.get('donBaoHanh')!.value)
        )
      )
      .subscribe((donBaoHanhs: IDonBaoHanh[]) => (this.donBaoHanhsSharedCollection = donBaoHanhs));

    this.phanLoaiChiTietTiepNhanService
      .query()
      .pipe(map((res: HttpResponse<IPhanLoaiChiTietTiepNhan[]>) => res.body ?? []))
      .pipe(
        map((phanLoaiChiTietTiepNhans: IPhanLoaiChiTietTiepNhan[]) =>
          this.phanLoaiChiTietTiepNhanService.addPhanLoaiChiTietTiepNhanToCollectionIfMissing(
            phanLoaiChiTietTiepNhans,
            this.editForm.get('phanLoaiChiTietTiepNhan')!.value
          )
        )
      )
      .subscribe(
        (phanLoaiChiTietTiepNhans: IPhanLoaiChiTietTiepNhan[]) => (this.phanLoaiChiTietTiepNhansSharedCollection = phanLoaiChiTietTiepNhans)
      );
  }

  protected createFromForm(): IChiTietSanPhamTiepNhan {
    return {
      ...new ChiTietSanPhamTiepNhan(),
      id: this.editForm.get(['id'])!.value,
      soLuongKhachHang: this.editForm.get(['soLuongKhachHang'])!.value,
      idKho: this.editForm.get(['idKho'])!.value,
      idBienBan: this.editForm.get(['idBienBan'])!.value,
      tongLoiKiThuat: this.editForm.get(['tongLoiKiThuat'])!.value,
      tongLoiLinhDong: this.editForm.get(['tongLoiLinhDong'])!.value,
      ngayPhanLoai: this.editForm.get(['ngayPhanLoai'])!.value
        ? dayjs(this.editForm.get(['ngayPhanLoai'])!.value, DATE_TIME_FORMAT)
        : undefined,
      soLuong: this.editForm.get(['soLuong'])!.value,
      tinhTrangBaoHanh: this.editForm.get(['tinhTrangBaoHanh'])!.value,
      sanPham: this.editForm.get(['sanPham'])!.value,
      donBaoHanh: this.editForm.get(['donBaoHanh'])!.value,
      phanLoaiChiTietTiepNhan: this.editForm.get(['phanLoaiChiTietTiepNhan'])!.value,
    };
  }
}
