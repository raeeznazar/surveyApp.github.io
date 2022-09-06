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
  showModal: boolean = false;
  questionId = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageServices: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageServices.getQuestions().subscribe((resData) => {
      console.log(this.questions);

      this.questions = resData;

      //Array question-> looping because questions are in inside an array
      for (var i = 0; i < this.questions.length; i++) {
        var question_name = '';
        for (var j = 0; j < this.questions[i].surveyquestion.length; j++) {
          question_name +=
            this.questions[i].surveyquestion[j].name +
            ' (' +
            this.questions[i].surveyquestion[j].version +
            ')  ';
        }
        // this.surveyquestions[i]=a;
        let feed = {
          question_name,
        };
        this.questions[i].questions = feed;
      }
    });
  }

  //Btn to add questions and it will navigate to add question pge
  addNewQuestion() {
    this.router.navigate(['sidebar/questions/add']);
    console.log('true');
  }

  // Open modal and passing questionId
  onDelete(questionId) {
    this.questionId = questionId;
    console.log(this.questionId);

    this.showModal = true;
  }

  //navigation to edit question page & passing questionId
  onEditQuestion(questionId) {
    this.router.navigate(['sidebar/question/create/' + questionId]);
  }

  //delete btn inside the modal, it will call api method to delete question
  onDeleteQestion() {
    this.dataStorageServices
      .deleteQuestion(this.questionId)
      .subscribe((resData: any) => {
        if (resData.Status == 0) {
          this.showModal = false;
          this.dataStorageServices.getQuestions().subscribe((resData) => {
            console.log(this.questions);

            this.questions = resData;
            for (var i = 0; i < this.questions.length; i++) {
              var question_name = '';
              for (
                var j = 0;
                j < this.questions[i].surveyquestion.length;
                j++
              ) {
                question_name +=
                  this.questions[i].surveyquestion[j].name +
                  ' (' +
                  this.questions[i].surveyquestion[j].version +
                  ')  ';
              }
              // this.surveyquestions[i]=a;
              let feed = {
                question_name,
              };
              this.questions[i].questions = feed;
            }
          });
        }
      });
  }
}
