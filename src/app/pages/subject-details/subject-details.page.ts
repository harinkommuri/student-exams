import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { ClassService } from "../../services/class/class.service";
import { SubjectService } from "../../services/subject/subject.service";

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.page.html',
  styleUrls: ['./subject-details.page.scss'],
})

export class SubjectDetailsPage implements OnInit, OnDestroy {
  subjectDetails: any = {};
  subjectDetailsSubscription: any;
  classSubcription: any
  topics: any[] = [];
  clsInfo: any = {};
  result: any = {
    percentageGained: 0,
    marksGained: 0,
    totalMarks: 0
  };
  topicData = {};
  //
  constructor(public router: Router,
    public classes: ClassService,
    public subjects: SubjectService) { }

  //
  ngOnInit() {
    this.classSubcription = this.classes.classes.subscribe((clsInfo: any) => {
      this.clsInfo = clsInfo;
    });
    this.subjectDetailsSubscription = this.subjects.subjects.subscribe((data: any) => {
      this.subjectDetails = data.subject;
      this.topics = data.subject.topics;
    });
  }
  ngOnDestroy() {
    this.classSubcription.unsubscribe();
    this.subjectDetailsSubscription.unsubscribe();
  }

  //
  showTopics(topic: any) {
    let data: any = {
      subject: this.subjectDetails,
      topic: topic
    }
    this.subjects.subjects.next(data);
    this.router.navigate(['/topic-details']);
  }

  onGetTopicData(topicData) {
    this.topicData[topicData.topicId] = topicData;

    this.result.percentageGained = 0;
    this.result.marksGained = 0;
    this.result.totalMarks = 0;

    for (let topicId in this.topicData) {
      let topicData = this.topicData[topicId];

      this.result.marksGained += topicData.marksGained;
      this.result.totalMarks += topicData.totalMarks;

    }
    let topicLength = Object.keys(this.topicData).length;
    let percentage: any = (this.result.marksGained / this.result.totalMarks) * 100;
    // let percentage: any = totalPercentageGained / topicLength;
    percentage = percentage.toFixed(2);
    this.result.percentageGained = parseFloat(percentage);
  }
}