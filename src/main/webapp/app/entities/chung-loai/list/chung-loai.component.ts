import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChungLoai } from '../chung-loai.model';
import { ChungLoaiService } from '../service/chung-loai.service';
import { ChungLoaiDeleteDialogComponent } from '../delete/chung-loai-delete-dialog.component';

@Component({
  selector: 'jhi-chung-loai',
  templateUrl: './chung-loai.component.html',
})
export class ChungLoaiComponent implements OnInit {
  chungLoais?: IChungLoai[];
  isLoading = false;

  constructor(protected chungLoaiService: ChungLoaiService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.chungLoaiService.query().subscribe({
      next: (res: HttpResponse<IChungLoai[]>) => {
        this.isLoading = false;
        this.chungLoais = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IChungLoai): number {
    return item.id!;
  }

  delete(chungLoai: IChungLoai): void {
    const modalRef = this.modalService.open(ChungLoaiDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chungLoai = chungLoai;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
