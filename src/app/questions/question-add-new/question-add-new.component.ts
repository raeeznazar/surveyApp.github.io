import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-add-new',
  templateUrl: './question-add-new.component.html',
  styleUrls: ['./question-add-new.component.css'],
})
export class QuestionAddNewComponent implements OnInit {
  submitForm: FormGroup;
  constructor() {}

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
    console.log(this.submitForm);
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
