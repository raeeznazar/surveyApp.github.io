import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css'],
})
export class TakeSurveyComponent implements OnInit {
  paramsToken: any = '';
  takeSurveyQuestions: any = [];
  currentQuestion: any;
  currentIndex = 0;
  locationName: any;
  departmentName: any;
  value: any;
  selectedOption: any = [];
  surveyReply: any = [];
  surveyId: any;
  recordId: any;
  errorMessage: any = '';
  successMessage: any = '';
  successBox = false;
  finished = true;

  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // console.log(params['token']);
      this.paramsToken = params['token'];
      this.dataStorageService
        .getTakeSurveyQuestion(this.paramsToken)
        .subscribe((surveyQuestionsResData) => {
          console.log(surveyQuestionsResData);

          // to get string interpolation to see in right side
          this.locationName = surveyQuestionsResData[0].hospital.Name;
          this.departmentName = surveyQuestionsResData[0].department.Name;

          this.surveyId = surveyQuestionsResData[0].surveyid;
          this.recordId = surveyQuestionsResData[0].recordid;
          // ---------------
          this.takeSurveyQuestions = surveyQuestionsResData[0].questions;
          this.currentQuestion = this.takeSurveyQuestions[0];

          // console.log(surveyQuestions);
        });
    });
    // this.dataStorageService.getTakeSurveyQuestion()
  }

  ///nextBtn

  onNext() {
    //logic to add numbers
    if (this.currentIndex < this.takeSurveyQuestions.length - 1) {
      // console.log('not last question');
      this.currentIndex = this.currentIndex + 1;
    } else {
      // console.log('last question');
      this.surveyReply = [];
      this.selectedOption.forEach((option, index) => {
        this.surveyReply.push({
          questionid: this.takeSurveyQuestions[index].questionid,
          questionoptionid: option,
          comments: '',
        });
      });

      const body = {
        surveyid: this.surveyId, // use value from get survey api
        recordid: this.recordId, // use value from get survey api
        surveyreply: this.surveyReply,
      };

      console.log(body);

      this.dataStorageService
        .postSurveDetails(body, this.paramsToken)
        .subscribe((postedData: any) => {
          if (postedData.Status == 0) {
            this.successMessage = ' Congragulations, you finished the survey';
            this.successBox = true;
            this.finished = false;
            console.log(postedData);
          } else {
            alert("'Sorry ! An Error Occur'");
            this.errorMessage = 'Sorry ! An Error Occur';
            this.finished = false;
          }
        });
    }
    this.currentQuestion = this.takeSurveyQuestions[this.currentIndex];
    console.log(this.surveyReply);

    // let replyIndex = this.surveyReply.findIndex(reply => reply.questionid == this.currentQuestion.questionid);
    // if(replyIndex == -1) {
    //   this.surveyReply.push({
    //     questionid: this.currentQuestion.questionid,
    //     questionoptionid: this.selectedOption,
    //     comments: '',
    //   });
    // } else {
    //   this.surveyReply[this.currentIndex].questionoptionid = this.selectedOption;
    // }

    // console.log(this.currentIndex);
  }
  //previous btn
  onPrevious() {
    if (this.currentIndex != 0) {
      this.currentIndex = this.currentIndex - 1;
    }
    // console.log(this.currentIndex);
    this.currentQuestion = this.takeSurveyQuestions[this.currentIndex];
    // this.surveyReply.push({
    //   questionid: this.currentQuestion.questionid,
    //   questionoptionid: this.selectedOption,
    //   comments: '',
    // });
    // this.selectedOption = this.surveyReply[this.currentIndex].questionoptionid;
  }
}
