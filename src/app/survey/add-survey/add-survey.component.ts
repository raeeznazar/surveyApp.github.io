import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],
})
export class AddSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {}
  //variables for survey selection btn
  survey = false;
  surveyDefinition = false;
  responseDefinition = false;
  alertDefinition = false;
  localStorageUser: any = '';
  locations: any = [];
  departments: any = [];
  languages: any = [];
  ages: any = [];
  surveyType: any = [];
  successBox = false;
  errorBox = false;
  statusMessage = '';
  paramsSurveyId: any = '';
  submitBtn = false;

  //Arrays
  cloneForms = [];
  ngOnInit(): void {
    this.surveyForm = new FormGroup({
      cloneForm: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      surveyName: new FormControl(null, [Validators.required]),
      ageGroup: new FormControl(null, [Validators.required]),
      language: new FormControl(null, [Validators.required]),
      surveyType: new FormControl(0, [Validators.required]),
      header: new FormControl(null, [Validators.required]),
      colour: new FormControl(null, [Validators.required]),
      emailSubject: new FormControl(null, [Validators.required]),
      emailMessage: new FormControl(null, [Validators.required]),
      textMessage: new FormControl(null, [Validators.required]),
      openDisclaimer: new FormControl(null, [Validators.required]),
      closeThankyou: new FormControl(null, [Validators.required]),
      thankYouHeader: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      header2: new FormControl(null, [Validators.required]),
      emailResponseMessage: new FormControl(null, [Validators.required]),
      smsResponseMessage: new FormControl(null, [Validators.required]),
      regular: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
      regular2: new FormControl(null, [Validators.required]),
      link2: new FormControl(null, [Validators.required]),
    });

    this.survey = true;

    // getting datas from local storage
    this.localStorageUser = JSON.parse(localStorage.getItem('userData'));

    //PARAMS PASING
    this.route.params.subscribe((params: Params) => {
      this.paramsSurveyId = +params['sId'];
      console.log(this.paramsSurveyId);

      // IF PARAMS EDITING MODE
      if (this.paramsSurveyId) {
        this.onCloneFromChanged(this.paramsSurveyId);
      } else {
        this.dataStorageService.getCloneForm().subscribe((resData: any) => {
          this.cloneForms = resData.results;
          // console.log(resData);

          this.surveyForm.patchValue({
            cloneForm: 0,
          });
        });
      }
    });

    //Location

    this.dataStorageService
      .getLocations(this.localStorageUser.UserData.user_id)
      .subscribe((resData) => {
        this.locations = resData.results;
        this.surveyForm.patchValue({
          location: this.locations[0].HospitalId,
        });
        //nested becoz we need to call get users to get users array
        this.dataStorageService
          .getDepartments(
            this.surveyForm.controls['location'].value,
            this.localStorageUser.UserData.user_id
          )
          .subscribe((res) => {
            this.departments = res.results;
            this.surveyForm.patchValue({
              department: this.departments[0].DepartmentId,
            });
          });
      });

    //getlanguages
    this.dataStorageService.getLanguages().subscribe((resData) => {
      this.languages = resData.results;
      this.surveyForm.patchValue({
        language: this.languages[0].language_id,
      });
    });

    //

    this.dataStorageService.getAge().subscribe((resData: any) => {
      this.ages = resData;
      // console.log(resData);
      this.surveyForm.patchValue({
        ageGroup: this.ages[0].agegroupid,
      });
      // console.log(this.surveyForm.controls['ageGroup'].value);
    });

    this.dataStorageService
      .getSurveyType(this.localStorageUser.UserData.client_id)
      .subscribe((resData: any) => {
        this.surveyType = resData;
        // console.log(resData);

        this.surveyForm.patchValue({
          surveyType: this.surveyType[0].id,
        });
      });
  }

  // btn for display survey
  onSurvey() {
    this.survey = true;
    this.responseDefinition = false;
    this.alertDefinition = false;
    this.surveyDefinition = false;
    this.submitBtn = false;
  }
  // btn for display survey
  onSurveyDefinition() {
    this.surveyDefinition = true;
    this.survey = false;
    this.responseDefinition = false;
    this.alertDefinition = false;
    this.submitBtn = false;
  }
  // btn for display Response Definition
  onResponseDefinition() {
    this.responseDefinition = true;
    this.surveyDefinition = false;
    this.survey = false;
    this.alertDefinition = false;
    this.submitBtn = false;
  }
  // btn for display Alert Definition
  onAlertDefinition() {
    this.alertDefinition = true;
    this.surveyDefinition = false;
    this.survey = false;
    this.responseDefinition = false;
    this.submitBtn = true;
  }

  onChangeSurveyLocation(changeLocation: any) {
    this.dataStorageService
      .getDepartments(changeLocation, this.localStorageUser.UserData.user_id)
      .subscribe((resData: any) => {
        this.departments = resData.results;

        this.surveyForm.patchValue({
          surveyDepartment: this.departments[0].DepartmentId,
        });
      });
  }

  // onChanges CALL
  // onChangeDepartment(locationChange: any) {
  //   this.dataStorageService
  //     .getDepartments(locationChange, this.localStorageUser.UserData.user_id)
  //     .subscribe((resData) => {
  //       this.departments = resData.results;
  //       this.surveyForm.patchValue({
  //         department: this.departments[0].DepartmentId,
  //       });
  //     });
  // }

  // to save forms
  onSave() {
    console.log(this.surveyForm.value);
    const body = {
      hospitalid: +this.surveyForm.controls['location'].value,
      departmentid: +this.surveyForm.controls['department'].value,
      name: this.surveyForm.controls['surveyName'].value,
      agegroupid: +this.surveyForm.controls['ageGroup'].value,
      languageid: +this.surveyForm.controls['language'].value,
      surveyheader: this.surveyForm.controls['header'].value,
      wizard_colour: 'rgba(23,146,220,1)',
      disclaimer: this.surveyForm.controls['openDisclaimer'].value,
      template: false,
      thankyoumessage: this.surveyForm.controls['closeThankyou'].value,
      thankyou_header: this.surveyForm.controls['thankYouHeader'].value,
      status: 0,
      surveysettings: {
        emailsubject: this.surveyForm.controls['emailSubject'].value,
        emailmessage: this.surveyForm.controls['emailMessage'].value,

        textmessage: this.surveyForm.controls['textMessage'].value,
      },
      responsesettings: {
        header: this.surveyForm.controls['header2'].value,
        subject: this.surveyForm.controls['subject'].value,
        emailbody: this.surveyForm.controls['emailResponseMessage'].value,
        smsbody: this.surveyForm.controls['smsResponseMessage'].value,
        status: 0,
      },
      specialsurvey: {},
      type: '0',
      alertsettings: {
        email_regular: this.surveyForm.controls['regular'].value,
        sms_regular: this.surveyForm.controls['regular2'].value,
        email_highrisk: '',
        email_lowrisk: '',
        email_clickmsg: this.surveyForm.controls['link'].value,
        sms_highrisk: '',
        sms_lowrisk: '',
        sms_clickmsg: this.surveyForm.controls['link2'].value,
        status: 0,
      },
    };

    // if params

    if (this.paramsSurveyId) {
      this.dataStorageService
        .putServey(body, this.paramsSurveyId)
        .subscribe((resData: any) => {
          if (resData.Status == 0) {
            this.errorBox = false;
            this.successBox = true;
            this.statusMessage = resData.Message;
            setTimeout(() => this.router.navigate(['sidebar/survey']), 2000);
            this.surveyForm.reset();
          } else {
            this.successBox = false;
            this.errorBox = true;
            this.statusMessage = resData.Message;
          }
        });
    } else {
      this.dataStorageService
        .postSurvey(body, this.surveyForm.controls['cloneForm'].value)
        .subscribe((resData: any) => {
          if (resData.Status == 0) {
            this.successBox = true;
            this.errorBox = false;
            this.statusMessage = resData.Message;
            setTimeout(() => this.router.navigate(['sidebar/survey']), 2000);
            this.surveyForm.reset();
          } else {
            this.errorBox = true;

            this.successBox = false;

            this.statusMessage = resData.Message;
          }
        });
    }
  }

  backToSurveys() {
    this.router.navigate(['sidebar/survey']);
  }

  onCloneFromChanged(cloneFromId) {
    this.dataStorageService.getSurveyById(cloneFromId).subscribe((res: any) => {
      console.log(res);

      this.dataStorageService
        .getDepartments(res.hospitalid, this.localStorageUser.UserData.user_id)
        .subscribe((resData: any) => {
          this.departments = resData.results;

          this.surveyForm.patchValue({
            location: res.hospitalid,
            department: res.departmentid,
            surveyName: res.name,
            ageGroup: res.agegroupid,
            language: res.languageid,
            surveyType: res.type,
            header: res.surveyheader,
            colour: res.wizard_colour,
            emailSubject: res.surveysettings.emailsubject,
            emailMessage: res.surveysettings.emailmessage,
            textMessage: res.surveysettings.textmessage,
            openDisclaimer: res.disclaimer,
            closeThankyou: res.thankyoumessage,
            thankYouHeader: res.thankyou_header,
            subject: res.responsesettings.subject,
            header2: res.responsesettings.header,
            emailResponseMessage: res.responsesettings.emailbody,
            smsResponseMessage: res.responsesettings.smsbody,
            regular: res.alertsettings.email_regular,
            link: res.alertsettings.email_clickmsg,
            regular2: res.alertsettings.sms_regular,
            link2: res.alertsettings.sms_clickmsg,
          });
          if (this.paramsSurveyId) {
            //function to disable cloneForm
            this.surveyForm.controls['cloneForm'].disable();
          } else {
            this.surveyForm.controls['cloneForm'].enable();
          }
        });
    });
  }
}
