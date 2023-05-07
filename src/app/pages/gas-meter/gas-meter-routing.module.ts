import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasMeterComponent } from './gas-meter.component';

const routes: Routes = [{ path: '', component: GasMeterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasMeterRoutingModule { }
