import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectDetailsPageRoutingModule } from './subject-details-routing.module';

import { SubjectDetailsPage } from './subject-details.page';
import { TopicScoreDirective } from 'src/app/directives/topic-score.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectDetailsPageRoutingModule
  ],
  declarations: [
    TopicScoreDirective,
    SubjectDetailsPage
  ]
})
export class SubjectDetailsPageModule {}
