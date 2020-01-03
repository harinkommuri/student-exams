import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController , NavController} from "@ionic/angular";

import { ResultCardComponent } from "../../components/result-card/result-card.component";
import { ClassService } from "../../services/class/class.service";
import { SubjectService } from "../../services/subject/subject.service";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})

export class ExamPage implements OnInit, OnDestroy {
  clsInfo: any = {};
  subjectSubscription: any;
  classSubcription: any;
  subjectDetails: any = {};
  topicDetails: any = {};
  questionnaire: any = {};

  //
  constructor(public modal: ModalController,
    public nav: NavController,
    public classes: ClassService,
    public subjectService: SubjectService) { }

  //
  ngOnInit() {
    this.classSubcription = this.classes.classes.subscribe((clsInfo: any) => {
      this.clsInfo = clsInfo;

      this.subjectSubscription = this.subjectService.subjects.subscribe((data: any) => {
        this.subjectDetails = data.subject;
        this.topicDetails = data.topic;

        let classId = this.clsInfo.id,
          subjectId = this.subjectDetails.id,
          topicId = this.topicDetails.id;

        let assignmentPath = `assignment_${classId}_${subjectId}_${topicId}.json`;

        console.log("Assignment path: ", assignmentPath);
        this.classes.getAssignment(assignmentPath).then(questionnaire => {
          console.log(questionnaire);
          this.questionnaire = questionnaire;
        }).catch(console.error);
      });
    });
  }
  ngOnDestroy() {
    this.classSubcription.unsubscribe();
    this.subjectSubscription.unsubscribe();
  }

  //
  finishTest() {
    this.modal.create({
      component: ResultCardComponent,
      componentProps: {
        examData: this.questionnaire,
        referrer: 'exam-page'
      }
    }).then(modal => {
      modal.present();

      modal.onWillDismiss().then(() => {
        this.nav.back();
      });
    });
  }
}