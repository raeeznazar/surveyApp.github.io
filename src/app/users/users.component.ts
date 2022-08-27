import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersForm: FormGroup;
  locations = [];
  departments = [];
  users = [];
  userId: any;
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData'));

    ////reactive form
    this.usersForm = new FormGroup({
      location: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      status: new FormControl(0, [Validators.required]),
    });

    //locations http calling
    this.dataStorageService
      .getLocations(this.userId.UserData.user_id)
      .subscribe((res) => {
        this.locations = res.results;
        this.usersForm.patchValue({
          location: this.locations[0].HospitalId,
        });

        //nested becoz we need to call get users to get users array
        //departmrnt call
        this.dataStorageService
          .getDepartments(
            this.usersForm.controls['location'].value,
            this.userId.UserData.user_id
          )
          .subscribe((res) => {
            this.departments = res.results;
            this.usersForm.patchValue({
              department: this.departments[0].DepartmentId,
            });

            // API of get user
            this.dataStorageService
              .getUsers(
                this.userId.UserData.user_id,
                this.userId.UserData.client_id,
                this.usersForm.controls['location'].value,
                this.usersForm.controls['department'].value,
                this.usersForm.controls['status'].value
              )
              .subscribe((resData) => {
                console.log(resData);

                this.users = resData;
              });
          });
      });
  }

  // onChanges CALL

  onChangeLocation(locationChangeValue: any) {
    this.dataStorageService
      .getDepartments(locationChangeValue, this.userId.UserData.user_id)
      .subscribe((resData) => {
        this.departments = resData.results;
        this.usersForm.patchValue({
          department: this.departments[0].DepartmentId,
        });

        // API of get user
        this.dataStorageService
          .getUsers(
            this.userId.UserData.user_id,
            this.userId.UserData.client_id,
            locationChangeValue,
            this.usersForm.controls['department'].value,
            this.usersForm.controls['status'].value
          )
          .subscribe((resData) => {
            console.log(resData);

            this.users = resData;
          });
      });
  }

  onChangeDepartment(departmentChangeValue: any) {
    this.dataStorageService
      .getUsers(
        this.userId.UserData.user_id,
        this.userId.UserData.client_id,
        this.usersForm.controls['location'].value,
        departmentChangeValue,
        this.usersForm.controls['status'].value
      )
      .subscribe((resData) => {
        console.log(resData);

        this.users = resData;
      });
  }

  onChangeStatus(statusChangeValue: any) {
    console.log(statusChangeValue);

    this.dataStorageService
      .getUsers(
        this.userId.UserData.user_id,
        this.userId.UserData.client_id,
        this.usersForm.controls['location'].value,
        this.usersForm.controls['dapartment'].value,
        statusChangeValue.value
      )
      .subscribe((resData) => {
        console.log(resData);

        this.users = resData;
      });
  }

  onCreateUsers() {
    this.router.navigate(['sidebar/users/create']);
  }
}
