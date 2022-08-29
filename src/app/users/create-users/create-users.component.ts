import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent implements OnInit {
  createUserForm: FormGroup;
  userId: any;
  locations = [];
  departments = [];
  languages = [];
  status = [];
  roles = [];
  constructor(private dataService: DataStorageService) {}

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      userName: new FormControl(null),
      name: new FormControl(null),
      userTitle: new FormControl(null),
      email: new FormControl(null),
      phoneNo: new FormControl(null),
      status: new FormControl(null),
      uploadPhoto: new FormControl(null),
      location: new FormControl(null),
      department: new FormControl(null),
      roles: new FormControl(null),
      level: new FormControl(null),
      language: new FormControl(null),
    });

    //getting datas from local storage

    this.userId = JSON.parse(localStorage.getItem('userData'));

    // location drop down
    this.dataService
      .getLocations(this.userId.UserData.user_id)
      .subscribe((resData) => {
        this.locations = resData.results;
        this.createUserForm.patchValue({
          location: this.locations[0].HospitalId,
        });

        // department drop down
        this.dataService
          .getDepartments(
            this.createUserForm.controls['location'].value,
            this.userId.UserData.user_id
          )
          .subscribe((resData) => {
            this.departments = resData.results;
            this.createUserForm.patchValue({
              department: this.departments[0].DepartmentId,
            });
          });
      });

    this.dataService.getLanguages().subscribe((resData) => {
      this.languages = resData.results;
      this.createUserForm.patchValue({
        language: this.languages[0].language_id,
      });
    });

    this.dataService
      .getRoles(this.userId.UserData.user_id)
      .subscribe((resData) => {
        this.roles = resData.results;
        console.log(this.roles);

        this.createUserForm.patchValue({
          roles: this.roles[0].role_id,
        });
      });
  }

  onCreate() {}
}
