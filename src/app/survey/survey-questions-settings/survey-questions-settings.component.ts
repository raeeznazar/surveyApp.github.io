import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-survey-questions-settings',
  templateUrl: './survey-questions-settings.component.html',
  styleUrls: ['./survey-questions-settings.component.css'],
})
export class SurveyQuestionsSettingsComponent implements OnInit {
  paramsSurveyDefinitionId: any = '';
  selectQuestion = 0;
  questions: any = [];
  surveyQuestions: any = [];
  sureveyQuestionId: any = '';
  errorBox = false;
  successBox = false;
  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.paramsSurveyDefinitionId = +params['surId'];
      this.dataStorageService.getQuestions().subscribe((questionData: any) => {
        this.questions = questionData.map((question) => {
          return {
            questionid: question.questionid,
            description: question.description,
            questiontype: {
              questiontypeid: question.questiontype.questiontypeid,
              description: question.questiontype.description,
            },
          };
        });
        console.log(this.questions);
      });

      this.dataStorageService
        .getSurveyQuestions(this.paramsSurveyDefinitionId)
        .subscribe((surveyQuestions: any) => {
          this.surveyQuestions = surveyQuestions.map(
            (surveyQuestion, index) => {
              return {
                surveydefinitionid: this.paramsSurveyDefinitionId, // survey definition id from the params
                question: {
                  questionid: surveyQuestion.question.questionid,
                  description: surveyQuestion.question.description,
                }, // question id the select question input
                order: index + 1, // order as specified in the table of survey questions
                questiontype: {
                  questiontypeid: surveyQuestion.questiontype.questiontypeid,
                  description: surveyQuestion.questiontype.description,
                },
                onetimequestion: false,
                cardquestion: false,
                datafiledetailmapping: 'No Mapping',
              };
            }
          );
        });
    });
  }

  deleteSurvey(questionid) {
    console.log(questionid);

    // this is to find a particular question have this questionId
    let deletedQuestion = this.surveyQuestions.filter(
      (surveyQuestion) => surveyQuestion.question.questionid == questionid
    );

    this.questions.push({
      questionid: deletedQuestion[0].question.questionid,
      description: deletedQuestion[0].question.description,
      questiontype: {
        questiontypeid: deletedQuestion[0].questiontype.questiontypeid,
        description: deletedQuestion[0].questiontype.description,
      },
    });

    //deleting index
    let deletedQuestionIndex = this.surveyQuestions.findIndex(
      (surveyQuestion) => surveyQuestion.question.questionid == questionid
    );
    console.log(deletedQuestionIndex);
    this.surveyQuestions.splice(deletedQuestionIndex, 1);
  }

  addQuestion() {
    let selectedQuestion = this.questions.filter(
      (question) => question.questionid == this.selectQuestion
    );
    this.surveyQuestions.push({
      surveydefinitionid: this.paramsSurveyDefinitionId, // survey definition id from the params
      question: {
        questionid: selectedQuestion[0].questionid,
        description: selectedQuestion[0].description,
      }, // question id the select question input
      order: this.surveyQuestions.length + 1, // order as specified in the table of survey questions
      questiontype: {
        questiontypeid: selectedQuestion[0].questiontypeid,
        description: selectedQuestion[0].questiontype.description,
      },
      onetimequestion: false,
      cardquestion: false,
      datafiledetailmapping: 'No Mapping',
    });

    let selectedQuestionIndex = this.questions.findIndex(
      (question) => question.questionid == this.selectQuestion
    );
    this.questions.splice(selectedQuestionIndex, 1);

    this.selectQuestion = 0;
  }

  onSaveSurveyQuestion() {
    // to post this.surveyQuestions array to database
    let body = this.surveyQuestions.map((surveyQuestion, index) => {
      return {
        surveydefinitionid: surveyQuestion.surveydefinitionid, // survey definition id from the params
        questionid: surveyQuestion.question.questionid, // question id the select question input
        order: index + 1, // order as specified in the table of survey questions
        onetimequestion: false,
        cardquestion: false,
        datafiledetailmapping: 'No Mapping',
      };
    });

    this.dataStorageService
      .saveSurveyQuestions(body)
      .subscribe((response: any) => {
        console.log(response);
        if (response.Status == 0) {
          console.log('successfully save');
          this.successBox = true;
          this.errorBox = false;
          setTimeout(() => {
            this.router.navigate(['sidebar/survey']);
          }, 2000);
        } else {
          console.log('An error occures');
          this.errorBox = true;
          this.successBox = false;
        }
      });
  }

  //back btn under table
  onbackToSurvey() {
    this.router.navigate(['sidebar/survey']);
  }
}
