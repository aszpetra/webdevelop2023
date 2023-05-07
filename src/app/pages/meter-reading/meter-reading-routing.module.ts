import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeterReadingComponent } from './meter-reading.component';

const routes: Routes = [{ path: '', component: MeterReadingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterReadingRoutingModule { }
