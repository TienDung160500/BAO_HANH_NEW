import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDonBaoHanh } from '../don-bao-hanh.model';
import { DonBaoHanhService } from '../service/don-bao-hanh.service';
import { DonBaoHanhDeleteDialogComponent } from '../delete/don-bao-hanh-delete-dialog.component';

@Component({
  selector: 'jhi-don-bao-hanh',
  templateUrl: './don-bao-hanh.component.html',
})
export class DonBaoHanhComponent implements OnInit {
  donBaoHanhs?: IDonBaoHanh[];
  isLoading = false;

  constructor(protected donBaoHanhService: DonBaoHanhService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.donBaoHanhService.query().subscribe({
      next: (res: HttpResponse<IDonBaoHanh[]>) => {
        this.isLoading = false;
        this.donBaoHanhs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDonBaoHanh): number {
    return item.id!;
  }

  delete(donBaoHanh: IDonBaoHanh): void {
    const modalRef = this.modalService.open(DonBaoHanhDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.donBaoHanh = donBaoHanh;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
