import { Component } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { ResultCardComponent } from "../../components/result-card/result-card.component";
import { ClassService } from "../../services/class/class.service";
import { SubjectService } from "../../services/subject/subject.service";

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.page.html',
  styleUrls: ['./topic-details.page.scss'],
})

export class TopicDetailsPage {
  clsInfo: any = {};
  subjectSubscription: any;
  classSubcription: any;
  subjectDetails: any = {};
  topicDetails: any = {};
  topicResults: any = [];
  result = {
    percentageGained: 0,
    marksGained: 0,
    totalMarks: 0
  };

  //
  constructor(
    public modal: ModalController,
    public storage: Storage,
    public classes: ClassService,
    public subjectService: SubjectService) { }

  ionViewWillEnter() {
    this.classSubcription = this.classes.classes.subscribe((clsInfo: any) => {
      this.clsInfo = clsInfo;

      this.subjectSubscription = this.subjectService.subjects.subscribe((data: any) => {
        this.subjectDetails = data.subject;
        this.topicDetails = data.topic;

        let classId = this.clsInfo.id,
          subjectId = this.subjectDetails.id,
          topicId = this.topicDetails.id;

        let resultKeyInStorage = `results_${classId}_${subjectId}_${topicId}`;

        this.storage.get(resultKeyInStorage).then(data => {
          let topicResults = [];
          if (data) {
            topicResults = JSON.parse(data);
          }

          this.topicResults = topicResults;

          this.result.percentageGained = 0;
          this.result.marksGained = 0;
          this.result.totalMarks = 0;

          if (this.topicResults.length) {
            topicResults.forEach(result => {
              this.result.marksGained += result.marksGained;
              this.result.totalMarks += result.totalMarks;
            });

            let percentage: any = (this.result.marksGained / this.result.totalMarks) * 100;
            percentage = percentage.toFixed(2);
            this.result.percentageGained = parseFloat(percentage);
          }
        });
      });
    })
  }

  ionViewWillLeave() {
    this.classSubcription.unsubscribe();
    this.subjectSubscription.unsubscribe();
  }

  showResultModal(result) {
    this.modal.create({
      component: ResultCardComponent,
      componentProps: {
        examData: result,
        referrer: 'topic-details'
      }
    }).then(modal => {
      modal.present();
    })
  }
}