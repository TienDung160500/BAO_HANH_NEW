import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISanPham } from '../san-pham.model';
import { SanPhamService } from '../service/san-pham.service';
import { SanPhamDeleteDialogComponent } from '../delete/san-pham-delete-dialog.component';

@Component({
  selector: 'jhi-san-pham',
  templateUrl: './san-pham.component.html',
})
export class SanPhamComponent implements OnInit {
  sanPhams?: ISanPham[];
  isLoading = false;

  constructor(protected sanPhamService: SanPhamService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.sanPhamService.query().subscribe({
      next: (res: HttpResponse<ISanPham[]>) => {
        this.isLoading = false;
        this.sanPhams = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISanPham): number {
    return item.id!;
  }

  delete(sanPham: ISanPham): void {
    const modalRef = this.modalService.open(SanPhamDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sanPham = sanPham;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
