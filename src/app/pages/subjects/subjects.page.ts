import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { ClassService } from "../../services/class/class.service";
import { SubjectService } from "../../services/subject/subject.service";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})

export class SubjectsPage implements OnInit, OnDestroy {
  clsInfo: any;
  classSubcription;
  allSubjects = [];

  //
  constructor(public router: Router,
    public classes: ClassService,
    public subjects: SubjectService) { }

  //
  ngOnInit() {
    this.classSubcription = this.classes.classes.subscribe((clsInfo: any) => {
      this.clsInfo = clsInfo;
      this.allSubjects = clsInfo.subjects;
    });
  }
  ngOnDestroy() {
    this.classSubcription.unsubscribe();
  }

  //
  showSubjectDetails(subject) {
    this.subjects.subjects.next({
      subject: subject
    } as any);

    this.router.navigate(['/subject-details']);
  }
}