import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasMeterRoutingModule } from './gas-meter-routing.module';
import { GasMeterComponent } from './gas-meter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GasMeterComponent
  ],
  imports: [
    CommonModule,
    GasMeterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
  ]
})
export class GasMeterModule { }
