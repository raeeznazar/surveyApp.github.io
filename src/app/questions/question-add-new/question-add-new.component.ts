import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-question-add-new',
  templateUrl: './question-add-new.component.html',
  styleUrls: ['./question-add-new.component.css'],
})
export class QuestionAddNewComponent implements OnInit {
  successBox = false;
  errorBox = false;
  message = '';
  paramqId: any = '';
  submitForm: FormGroup;
  hideFormArray = true;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Reactive form for questions
    this.submitForm = new FormGroup({
      questionType: new FormControl(1, [Validators.required]),
      questionDescription: new FormControl(null, [Validators.required]),
      addQuestionsArray: new FormArray([]),
    });

    this.route.params.subscribe((params: Params) => {
      this.paramqId = +params['qId'];

      //API calling for populate questions during editing
      if (this.paramqId) {
        this.dataStorageService
          .getQuestionsById(this.paramqId)
          .subscribe((questionResponse: any) => {
            // console.log(questionResponse);

            this.submitForm.patchValue({
              questionType: questionResponse.questiontypeid,
              questionDescription: questionResponse.description,
            });

            // Adding values to Array
            for (let option of questionResponse.question_option) {
              this.onAddQuestionForEdit(
                option.orderid,
                option.option,
                option.response,
                option.id
              );
            }
          });
      } else {
        this.onAddQuestions();
        this.onAddQuestions();
      }
    });
  }

  // form array for editing and adding values
  onAddQuestionForEdit(optionOrder, option, response, optionId) {
    (<FormArray>this.submitForm.get('addQuestionsArray')).push(
      new FormGroup({
        questionOrder: new FormControl(optionOrder, [Validators.required]),
        options: new FormControl(option, [Validators.required]),
        response: new FormControl(response, [Validators.required]),
        optionId: new FormControl(0),
      })
    );
  }

  onSubmit() {
    // console.log(this.submitForm.get('addQuestionsArray').value);
    let question_options: any = [];
    for (let option of this.submitForm.get('addQuestionsArray').value) {
      question_options.push({
        orderid: option.questionOrder, // order input value
        option: option.options, // option input value
        response: option.response, // response input value
        answer: false,
        prepopulated: null,
        image: '',
        id: option.optionId, // for new option only pass 0 other wise use from get by id api
      });
    }

    const body: any = {
      description: this.submitForm.controls['questionDescription'].value,
      questiontypeid: this.submitForm.controls['questionType'].value, // question type select box value
      languageid: 1,
      questiontag: '',
      likertype: false,
      covid: false,
      status: 0,
      list_type: 1,
      text_box_type: 1,
      questionsubtypeid: null,
      image: '',
      question_option: question_options,
    };

    if (this.paramqId) {
      this.dataStorageService
        .editQuestion(this.paramqId, body)
        .subscribe((resData: any) => {
          if (resData.Status == 0) {
            this.successBox = true;
            this.message = 'Successfully updated';
          } else {
            this.errorBox = true;
            this.message = 'An error occured';
          }
        });
    } else {
      this.dataStorageService.postQuestions(body).subscribe((resData: any) => {
        if (resData.Status == 0) {
          this.successBox = true;
          this.message = 'Successfully Submitted';

          setTimeout(() => this.router.navigate(['sidebar/questions']), 2000);
        } else {
          this.errorBox = true;
          this.message = 'An error occured';
        }
      });
    }
  }
  // function to add form arrays
  onAddQuestions() {
    (<FormArray>this.submitForm.get('addQuestionsArray')).push(
      new FormGroup({
        questionOrder: new FormControl(null, [Validators.required]),
        options: new FormControl(null, [Validators.required]),
        response: new FormControl(null, [Validators.required]),
        optionId: new FormControl(0),
      })
    );
  }
  onDeleteQuestions(index: number) {
    (<FormArray>this.submitForm.get('addQuestionsArray')).removeAt(index);
  }

  back() {
    this.router.navigate(['sidebar/questions']);
  }
}
