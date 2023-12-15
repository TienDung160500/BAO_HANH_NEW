import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPhanLoaiChiTietTiepNhan } from '../phan-loai-chi-tiet-tiep-nhan.model';
import { PhanLoaiChiTietTiepNhanService } from '../service/phan-loai-chi-tiet-tiep-nhan.service';
import { PhanLoaiChiTietTiepNhanDeleteDialogComponent } from '../delete/phan-loai-chi-tiet-tiep-nhan-delete-dialog.component';

@Component({
  selector: 'jhi-phan-loai-chi-tiet-tiep-nhan',
  templateUrl: './phan-loai-chi-tiet-tiep-nhan.component.html',
})
export class PhanLoaiChiTietTiepNhanComponent implements OnInit {
  phanLoaiChiTietTiepNhans?: IPhanLoaiChiTietTiepNhan[];
  isLoading = false;

  constructor(protected phanLoaiChiTietTiepNhanService: PhanLoaiChiTietTiepNhanService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.phanLoaiChiTietTiepNhanService.query().subscribe({
      next: (res: HttpResponse<IPhanLoaiChiTietTiepNhan[]>) => {
        this.isLoading = false;
        this.phanLoaiChiTietTiepNhans = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPhanLoaiChiTietTiepNhan): number {
    return item.id!;
  }

  delete(phanLoaiChiTietTiepNhan: IPhanLoaiChiTietTiepNhan): void {
    const modalRef = this.modalService.open(PhanLoaiChiTietTiepNhanDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.phanLoaiChiTietTiepNhan = phanLoaiChiTietTiepNhan;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
