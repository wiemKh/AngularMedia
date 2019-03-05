import { NgModule } from '@angular/core';
import { AngularMediaComponent } from './angular-media.component';
import { CommonModule } from '@angular/common';
import { MomentModule } from "angular2-moment";

@NgModule({
  declarations: [AngularMediaComponent],
  imports: [CommonModule,MomentModule
  ],
  exports: [AngularMediaComponent]
})
export class AngularMediaModule { }
