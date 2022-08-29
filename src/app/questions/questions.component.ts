import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  questions = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageServices: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageServices.getQuestions().subscribe((resData) => {
      this.questions = resData;
      for (var i = 0; i < this.questions.length; i++) {
        var question_name = '';
        for (var j = 0; j < this.questions[i].surveyquestion.length; j++) {
        question_name += this.questions[i].surveyquestion[j].name + ' (' + this.questions[i].surveyquestion[j].version + ')  ';
        }
        // this.surveyquestions[i]=a;
        let feed = {
          question_name
        }; this.questions[i].questions = feed;

      }

      console.log(this.questions);
    });
  }

  addNewQuestion() {
    this.router.navigate(['sidebar/questions/add']);
    console.log('true');
  }
}
