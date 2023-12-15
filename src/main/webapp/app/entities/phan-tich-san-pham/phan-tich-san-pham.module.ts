import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PhanTichSanPhamComponent } from './list/phan-tich-san-pham.component';
import { PhanTichSanPhamDetailComponent } from './detail/phan-tich-san-pham-detail.component';
import { PhanTichSanPhamUpdateComponent } from './update/phan-tich-san-pham-update.component';
import { PhanTichSanPhamDeleteDialogComponent } from './delete/phan-tich-san-pham-delete-dialog.component';
import { PhanTichSanPhamRoutingModule } from './route/phan-tich-san-pham-routing.module';

@NgModule({
  imports: [SharedModule, PhanTichSanPhamRoutingModule],
  declarations: [
    PhanTichSanPhamComponent,
    PhanTichSanPhamDetailComponent,
    PhanTichSanPhamUpdateComponent,
    PhanTichSanPhamDeleteDialogComponent,
  ],
  entryComponents: [PhanTichSanPhamDeleteDialogComponent],
})
export class PhanTichSanPhamModule {}
