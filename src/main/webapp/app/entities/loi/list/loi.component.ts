import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILoi } from '../loi.model';
import { LoiService } from '../service/loi.service';
import { LoiDeleteDialogComponent } from '../delete/loi-delete-dialog.component';

@Component({
  selector: 'jhi-loi',
  templateUrl: './loi.component.html',
})
export class LoiComponent implements OnInit {
  lois?: ILoi[];
  isLoading = false;

  constructor(protected loiService: LoiService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.loiService.query().subscribe({
      next: (res: HttpResponse<ILoi[]>) => {
        this.isLoading = false;
        this.lois = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ILoi): number {
    return item.id!;
  }

  delete(loi: ILoi): void {
    const modalRef = this.modalService.open(LoiDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.loi = loi;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
