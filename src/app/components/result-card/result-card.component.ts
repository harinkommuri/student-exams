import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, NavParams } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { ClassService } from "../../services/class/class.service";
import { SubjectService } from "../../services/subject/subject.service";

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
})
export class ResultCardComponent implements OnInit, OnDestroy {
  clsInfo: any = {};
  subjectSubscription: any;
  classSubcription: any;
  subjectDetails: any = {};
  topicDetails: any = {};
  result: any = {};
  //
  constructor(public modal: ModalController,
    public navParams: NavParams,
    public storage: Storage,
    public classes: ClassService,
    public subjectService: SubjectService) { }

  //
  ngOnInit() {
    console.clear();
    this.calculate();
  }
  ngOnDestroy() {
    if (this.classSubcription) {
      this.classSubcription.unsubscribe();
      this.subjectSubscription.unsubscribe();
    }
  }

  //
  calculate() {
    let examData = this.navParams.get('examData');
    console.log(examData);

    let referrer = this.navParams.get('referrer');
    if (referrer == "exam-page") {
      this.classSubcription = this.classes.classes.subscribe((clsInfo: any) => {
        this.clsInfo = clsInfo;

        this.subjectSubscription = this.subjectService.subjects.subscribe((data: any) => {
          this.subjectDetails = data.subject;
          this.topicDetails = data.topic;

          let classId = this.clsInfo.id,
            subjectId = this.subjectDetails.id,
            topicId = this.topicDetails.id;
          let resultKeyInStorage = `results_${classId}_${subjectId}_${topicId}`;


          let questions = examData.questions;

          let result: any = {
            examId: Date.now(),
            attemptedOn: Date.now()
          };

          //
          let totalMarks = questions.length,
            marksGained = 0;
          questions.forEach(question => {
            question.givenAnswers = [];

            question.options.forEach((option, optionIndex) => {
              if (option.checked) {
                question.givenAnswers.push(optionIndex);
              }
            });

            if (question.givenAnswers.length && (question.givenAnswers == question.answer)) {
              question.correct = true;
              marksGained++;
            } else {
              question.correct = false;
            }
          });

          let percentage: any = (marksGained / totalMarks) * 100;
          percentage = percentage.toFixed(2);

          result.questions = questions;
          result.totalMarks = totalMarks;
          result.marksGained = marksGained;
          result.percentageGained = parseFloat(percentage);

          this.result = result;
          this.storage.get(resultKeyInStorage).then(data => {
            let topicResults = [];
            if (data) {
              topicResults = JSON.parse(data);
            }

            topicResults.push(this.result);

            console.log("Topic results: ");
            console.log(topicResults);

            let topicResultsStr = JSON.stringify(topicResults);
            this.storage.set(resultKeyInStorage, topicResultsStr);
          });
        });
      });
    } else {
      this.result = examData;
    }
  }

  //
  closeModal() {
    this.modal.dismiss();
  }
}