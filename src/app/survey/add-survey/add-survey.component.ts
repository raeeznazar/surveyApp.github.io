import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],
})
export class AddSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  constructor() {
    this.surveyForm = new FormGroup({
      cloneForm: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      surveyName: new FormControl(null, [Validators.required]),
      ageGroup: new FormControl(null, [Validators.required]),
      language: new FormControl(null, [Validators.required]),
      surveyType: new FormControl(null, [Validators.required]),
      header: new FormControl(null, [Validators.required]),
      colour: new FormControl(null, [Validators.required]),
      emailSubject: new FormControl(null, [Validators.required]),
      emailMessage: new FormControl(null, [Validators.required]),
      textMessage: new FormControl(null, [Validators.required]),
      openDisclaimer: new FormControl(null, [Validators.required]),
      closeThankyou: new FormControl(null, [Validators.required]),
      thankYouEditor: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      header2: new FormControl(null, [Validators.required]),
      emailResponseMessage: new FormControl(null, [Validators.required]),
      smsResponseMessage: new FormControl(null, [Validators.required]),
      regular: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
      regular2: new FormControl(null, [Validators.required]),
      link2: new FormControl(null, [Validators.required]),
    });
  }
  //variables for survey selection btn
  survey = false;
  surveyDefinition = false;
  responseDefinition = false;
  alertDefinition = false;

  ngOnInit(): void {
    this.survey = true;
  }

  // btn for display survey
  onSurvey() {
    this.survey = true;
    this.responseDefinition = false;
    this.alertDefinition = false;
    this.surveyDefinition = false;
  }
  // btn for display survey
  onSurveyDefinition() {
    this.surveyDefinition = true;
    this.survey = false;
    this.responseDefinition = false;
    this.alertDefinition = false;
  }
  // btn for display Response Definition
  onResponseDefinition() {
    this.responseDefinition = true;
    this.surveyDefinition = false;
    this.survey = false;
    this.alertDefinition = false;
  }
  // btn for display Alert Definition
  onAlertDefinition() {
    this.alertDefinition = true;
    this.surveyDefinition = false;
    this.survey = false;
    this.responseDefinition = false;
  }

  // to save forms
  onSave() {
    console.log(this.surveyForm.value);
  }
}
