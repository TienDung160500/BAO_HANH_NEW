import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SanPhamComponent } from './list/san-pham.component';
import { SanPhamDetailComponent } from './detail/san-pham-detail.component';
import { SanPhamUpdateComponent } from './update/san-pham-update.component';
import { SanPhamDeleteDialogComponent } from './delete/san-pham-delete-dialog.component';
import { SanPhamRoutingModule } from './route/san-pham-routing.module';

@NgModule({
  imports: [SharedModule, SanPhamRoutingModule],
  declarations: [SanPhamComponent, SanPhamDetailComponent, SanPhamUpdateComponent, SanPhamDeleteDialogComponent],
  entryComponents: [SanPhamDeleteDialogComponent],
})
export class SanPhamModule {}
