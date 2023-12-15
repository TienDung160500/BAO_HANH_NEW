import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChungLoaiComponent } from './list/chung-loai.component';
import { ChungLoaiDetailComponent } from './detail/chung-loai-detail.component';
import { ChungLoaiUpdateComponent } from './update/chung-loai-update.component';
import { ChungLoaiDeleteDialogComponent } from './delete/chung-loai-delete-dialog.component';
import { ChungLoaiRoutingModule } from './route/chung-loai-routing.module';

@NgModule({
  imports: [SharedModule, ChungLoaiRoutingModule],
  declarations: [ChungLoaiComponent, ChungLoaiDetailComponent, ChungLoaiUpdateComponent, ChungLoaiDeleteDialogComponent],
  entryComponents: [ChungLoaiDeleteDialogComponent],
})
export class ChungLoaiModule {}
