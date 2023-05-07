import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterReadingRoutingModule } from './meter-reading-routing.module';
import { MeterReadingComponent } from './meter-reading.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    MeterReadingComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    MeterReadingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
  ]
})
export class MeterReadingModule { }
