import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DonaComponent } from './dona/dona.component';
import { ImageModalComponent } from './image-modal/image-modal.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DonaComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementerComponent,
    DonaComponent,
    ImageModalComponent
  ]
})
export class ComponentsModule { }
