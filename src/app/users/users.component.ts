import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

// declare var window: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  //modal
  // formModal: any;
  showModal: boolean = false;
  usersForm: FormGroup;
  locations = [];
  departments = [];
  users = [];
  userId: any;
  username = '';
  delUser_id = '';
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    // getting datas from local storage
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

    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById('myModals')
    // );
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
        // console.log(resData);

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
        // console.log(resData);

        this.users = resData;
      });
  }

  // this navigate to create user page
  onCreateUsers() {
    this.router.navigate(['sidebar/users/create']);
  }

  //delete icon on page
  onDeleteUser(username, userId) {
    this.username = username;

    this.delUser_id = userId;
    this.showModal = true;
  }

  // delete btn in modal
  onDelete() {
    this.dataStorageService
      .deleteUsers(this.delUser_id)
      .subscribe((resData: any) => {
        // this.users = resData;
        if (resData.Status == 0) {
          this.showModal = false;

          // API of get user
          this.dataStorageService
            .getUsers(
              this.userId.UserData.user_id,
              this.userId.UserData.client_id,
              this.usersForm.controls['location'].value,
              this.usersForm.controls['department'].value,
              this.usersForm.controls['status'].value,
            )
            .subscribe((resData) => {
              // console.log(resData);
              this.users = resData;
            });
        }
      });
  }

  onEditUsersTable(userId) {
    this.router.navigate([
      'sidebar/users/create/' +
        this.usersForm.controls['location'].value +
        '/' +
        this.usersForm.controls['department'].value +
        '/' +
        userId,
    ]);
  }
}
