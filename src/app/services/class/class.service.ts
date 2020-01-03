import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})

export class ClassService {
  classes = new BehaviorSubject(1);
  //
  constructor(public http: HttpService) { }

  //
  getClasses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get("./assets/mock/subjects.json").then(resolve).catch(reject);
    });
  }

  //
  getAssignment(assignmentFileName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`./assets/mock/${assignmentFileName}`).then(unformattedQuestionnaire => {
        let formattedQuestionnaire = {
          videoId: unformattedQuestionnaire.videoId,
          questions: []
        };
        let questionIndexes = [],
          questions = unformattedQuestionnaire.questions;

        // Get 5 random questions from questions array so that use can not get same statis questions.
        for(let i=0;i<5;i++) {
          let randomIndex = this.randomInteger(0, questions.length-1);

          if(questionIndexes.includes(randomIndex)) {
            i--;
          } else {
            questionIndexes.push(randomIndex);
          }
        }

        questionIndexes.forEach(questionIndex => {
          let unformattedQuestion = questions[questionIndex];
          let formattedQuestion: any = {
            question: unformattedQuestion.question
          }; 

          // Shuffle options so that user can not get options with same positions.
          let options = unformattedQuestion.options;
          options.push(unformattedQuestion.answer);
          options = this.shuffleArray(options);
          formattedQuestion.options = [];
          options.forEach(option => {
            formattedQuestion.options.push({
              checked: false,
              text: option
            });
          });

          //
          let answer = options.indexOf(unformattedQuestion.answer);
          formattedQuestion.answer = answer;

          formattedQuestionnaire.questions.push(formattedQuestion);
        });

        resolve(formattedQuestionnaire);
      }).catch(reject);
    });
  }

  //
  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}
