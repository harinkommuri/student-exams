import { Directive, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";

@Directive({
  selector: '[topicScore]'
})

export class TopicScoreDirective implements OnInit {
  @Input('topicScore') data;
  @Output() onGetData = new EventEmitter();
  //
  constructor(public storage: Storage) { }

  //
  ngOnInit() {
    let classId = this.data.clsInfo.id,
      subjectId = this.data.subject.id,
      topicId = this.data.topic.id;

    let resultKeyInStorage = `results_${classId}_${subjectId}_${topicId}`;

    this.storage.get(resultKeyInStorage).then(data => {
      let topicResults = [];
      if (data) {
        topicResults = JSON.parse(data);
      }

      let result: any = {
        topicId: topicId,
        percentageGained: 0,
        marksGained: 0,
        totalMarks: 0
      };

      if (topicResults.length) {
        topicResults.forEach(topicResult => {
          result.marksGained += topicResult.marksGained;
          result.totalMarks += topicResult.totalMarks;
        });

        let percentage: any = (result.marksGained / result.totalMarks) * 100;
        percentage = percentage.toFixed(2);
        result.percentageGained = parseFloat(percentage);
      }

      //
      this.onGetData.emit(result);
    });
  }
}