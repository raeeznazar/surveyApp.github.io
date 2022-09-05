import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  showModal: boolean = false;
  surveyForm: FormGroup;
  locations = [];
  departments = [];
  types = [];
  surveys = [];

  userId: any;
  surveyDefinitionId: any;
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData'));

    this.surveyForm = new FormGroup({
      surveyLocation: new FormControl(null),
      surveyDepartment: new FormControl(null),
      surveyType: new FormControl(null),
    });

    //location
    this.dataStorageService
      .getLocations(this.userId.UserData.user_id)
      .subscribe((resData) => {
        this.locations = resData.results;

        this.surveyForm.patchValue({
          surveyLocation: this.locations[0].HospitalId,
        });

        //department
        this.dataStorageService
          .getDepartments(
            this.surveyForm.controls['surveyLocation'].value,
            this.userId.UserData.user_id
          )
          .subscribe((resData) => {
            this.departments = resData.results;

            this.surveyForm.patchValue({
              surveyDepartment: this.departments[0].DepartmentId,
            });

            // surveyType
            this.dataStorageService
              .getSurveyType(this.userId.UserData.client_id)
              .subscribe((resData) => {
                this.types = resData;
                console.log(this.types);

                this.surveyForm.patchValue({
                  surveyType: this.types[0].id,
                });

                this.dataStorageService
                  .getSurvey(
                    this.surveyForm.controls['surveyLocation'].value,
                    this.surveyForm.controls['surveyDepartment'].value,
                    this.surveyForm.controls['surveyType'].value
                  )
                  .subscribe((resData) => {
                    this.surveys = resData.results;
                  });
              });
          });
      });
  }

  // btn to add survey
  onAddSurvey() {
    this.router.navigate(['sidebar/survey/add']);
  }

  // btn for survey setting
  onSurveySettings(surveydefinitionid) {
    // console.log(surveydefinitionid);

    this.router.navigate(['sidebar/survey/settings/' + surveydefinitionid]);
  }

  // onchange properties

  onChangeSurveyDepartment(changeDepartment: any) {
    this.dataStorageService
      .getSurvey(
        this.surveyForm.controls['surveyLocation'].value,
        changeDepartment,
        this.surveyForm.controls['surveyType'].value
      )
      .subscribe((resData) => {
        this.surveys = resData.results;
      });
  }
  onChangeSurveyLocation(changeLocation: any) {
    this.dataStorageService
      .getDepartments(changeLocation, this.userId.UserData.user_id)
      .subscribe((resData: any) => {
        this.departments = resData.results;

        this.surveyForm.patchValue({
          surveyDepartment: this.departments[0].DepartmentId,
        });
        this.dataStorageService
          .getSurvey(
            changeLocation,
            this.surveyForm.controls['surveyDepartment'].value,
            this.surveyForm.controls['surveyType'].value
          )
          .subscribe((resData) => {
            this.surveys = resData.results;
          });
      });
  }

  onChangeSurveyType(changeType: any) {
    this.dataStorageService
      .getSurvey(
        this.surveyForm.controls['surveyLocation'].value,
        this.surveyForm.controls['surveyDepartment'].value,
        changeType
      )
      .subscribe((resData) => {
        this.surveys = resData.results;
      });
  }

  onDelete(surveydefinitionid) {
    this.showModal = true;
    this.surveyDefinitionId = surveydefinitionid;
  }

  onDeleteSurvey() {
    this.dataStorageService
      .deleteSurvey(this.surveyDefinitionId)
      .subscribe((resData: any) => {
        // this.users = resData;
        if (resData.Status == 0) {
          this.showModal = false;

          // API of get user
          this.dataStorageService;
          this.dataStorageService
            .getSurvey(
              this.surveyForm.controls['surveyLocation'].value,
              this.surveyForm.controls['surveyDepartment'].value,
              this.surveyForm.controls['surveyType'].value
            )
            .subscribe((resData) => {
              this.surveys = resData.results;
            });
        } else {
          console.log('An error occured');
          alert('An error occured');
          this.showModal = false;
        }
      });
  }

  onEditSurvey(surveydefinitionid) {
    console.log(surveydefinitionid);

    this.router.navigate(['sidebar/survey/edit/' + surveydefinitionid]);
  }
}
