import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  submitForm: FormGroup;
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      questionType: new FormControl(1, [Validators.required]),
      questionDescription: new FormControl(null, [Validators.required]),
      addQuestionsArray: new FormArray([]),
    });
    this.onAddQuestions();
    this.onAddQuestions();
  }

  onSubmit() {
    console.log(this.submitForm.get('addQuestionsArray').value);
    let question_options: any = [];
    for (let option of this.submitForm.get('addQuestionsArray').value) {
      question_options.push({
        orderid: option.questionOrder, // order input value
        option: option.options, // option input value
        response: option.response, // response input value
        answer: false,
        prepopulated: null,
        image: '',
        id: 0, // for new option only pass 0 other wise use from get by id api
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

  onAddQuestions() {
    (<FormArray>this.submitForm.get('addQuestionsArray')).push(
      new FormGroup({
        questionOrder: new FormControl(null, [Validators.required]),
        options: new FormControl(null, [Validators.required]),
        response: new FormControl(null, [Validators.required]),
      })
    );
  }
  onDeleteQuestions(index: number) {
    (<FormArray>this.submitForm.get('addQuestionsArray')).removeAt(index);
  }
}
