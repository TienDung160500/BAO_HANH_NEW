import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INhomKhachHang } from '../nhom-khach-hang.model';
import { NhomKhachHangService } from '../service/nhom-khach-hang.service';
import { NhomKhachHangDeleteDialogComponent } from '../delete/nhom-khach-hang-delete-dialog.component';

@Component({
  selector: 'jhi-nhom-khach-hang',
  templateUrl: './nhom-khach-hang.component.html',
})
export class NhomKhachHangComponent implements OnInit {
  nhomKhachHangs?: INhomKhachHang[];
  isLoading = false;

  constructor(protected nhomKhachHangService: NhomKhachHangService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.nhomKhachHangService.query().subscribe({
      next: (res: HttpResponse<INhomKhachHang[]>) => {
        this.isLoading = false;
        this.nhomKhachHangs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: INhomKhachHang): number {
    return item.id!;
  }

  delete(nhomKhachHang: INhomKhachHang): void {
    const modalRef = this.modalService.open(NhomKhachHangDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.nhomKhachHang = nhomKhachHang;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
