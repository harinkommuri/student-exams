import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ClassService } from "../../services/class/class.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  allClasses: Promise<any>;
  //
  constructor(public router: Router,
    public classes: ClassService) {}

  //
  ngOnInit() {
    this.allClasses = this.classes.getClasses();
    // .then(console.info).catch(console.error);
  }

  showSubjects(cls: any) {
    this.classes.classes.next(cls);

    this.router.navigate(['/subjects']);
  }
}