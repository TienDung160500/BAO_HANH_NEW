import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPhanTichSanPham } from '../phan-tich-san-pham.model';
import { PhanTichSanPhamService } from '../service/phan-tich-san-pham.service';
import { PhanTichSanPhamDeleteDialogComponent } from '../delete/phan-tich-san-pham-delete-dialog.component';

@Component({
  selector: 'jhi-phan-tich-san-pham',
  templateUrl: './phan-tich-san-pham.component.html',
})
export class PhanTichSanPhamComponent implements OnInit {
  phanTichSanPhams?: IPhanTichSanPham[];
  isLoading = false;

  constructor(protected phanTichSanPhamService: PhanTichSanPhamService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.phanTichSanPhamService.query().subscribe({
      next: (res: HttpResponse<IPhanTichSanPham[]>) => {
        this.isLoading = false;
        this.phanTichSanPhams = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPhanTichSanPham): number {
    return item.id!;
  }

  delete(phanTichSanPham: IPhanTichSanPham): void {
    const modalRef = this.modalService.open(PhanTichSanPhamDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.phanTichSanPham = phanTichSanPham;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
