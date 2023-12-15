import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDanhSachTinhTrang } from '../danh-sach-tinh-trang.model';
import { DanhSachTinhTrangService } from '../service/danh-sach-tinh-trang.service';
import { DanhSachTinhTrangDeleteDialogComponent } from '../delete/danh-sach-tinh-trang-delete-dialog.component';

@Component({
  selector: 'jhi-danh-sach-tinh-trang',
  templateUrl: './danh-sach-tinh-trang.component.html',
})
export class DanhSachTinhTrangComponent implements OnInit {
  danhSachTinhTrangs?: IDanhSachTinhTrang[];
  isLoading = false;

  constructor(protected danhSachTinhTrangService: DanhSachTinhTrangService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.danhSachTinhTrangService.query().subscribe({
      next: (res: HttpResponse<IDanhSachTinhTrang[]>) => {
        this.isLoading = false;
        this.danhSachTinhTrangs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDanhSachTinhTrang): number {
    return item.id!;
  }

  delete(danhSachTinhTrang: IDanhSachTinhTrang): void {
    const modalRef = this.modalService.open(DanhSachTinhTrangDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.danhSachTinhTrang = danhSachTinhTrang;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
