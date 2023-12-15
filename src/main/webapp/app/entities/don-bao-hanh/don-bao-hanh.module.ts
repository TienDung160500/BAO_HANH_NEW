import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DonBaoHanhComponent } from './list/don-bao-hanh.component';
import { DonBaoHanhDetailComponent } from './detail/don-bao-hanh-detail.component';
import { DonBaoHanhUpdateComponent } from './update/don-bao-hanh-update.component';
import { DonBaoHanhDeleteDialogComponent } from './delete/don-bao-hanh-delete-dialog.component';
import { DonBaoHanhRoutingModule } from './route/don-bao-hanh-routing.module';

@NgModule({
  imports: [SharedModule, DonBaoHanhRoutingModule],
  declarations: [DonBaoHanhComponent, DonBaoHanhDetailComponent, DonBaoHanhUpdateComponent, DonBaoHanhDeleteDialogComponent],
  entryComponents: [DonBaoHanhDeleteDialogComponent],
})
export class DonBaoHanhModule {}
