import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamPageRoutingModule } from './exam-routing.module';

import { EmbeddedDirective } from "../../directives/embedded-video.directive";
import { ExamPage } from './exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamPageRoutingModule
  ],
  declarations: [
    ExamPage,
    EmbeddedDirective
  ]
})
export class ExamPageModule {}
