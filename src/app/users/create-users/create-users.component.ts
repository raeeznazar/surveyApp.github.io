import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  levels = [];
  errorUserName = '';
  errorEmail = '';
  errorMessage = '';
  successBox = false;
  errorBox = false;
  paramId: any = '';
  paramhId: any = '';
  paramdId: any = '';


  constructor(
    private dataService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

    // edit

    this.route.params.subscribe((params: Params) => {
      this.paramhId = +params['hId'];
      this.paramdId = +params['dId'];
      this.paramId = +params['userId'];
      console.log(this.paramId);
      console.log(params);
      if (this.paramhId) {
        this.dataService
          .getUserById(this.paramId)
          .subscribe((userResponse: any) => {
            console.log(userResponse);

            this.createUserForm.patchValue({
              userName: userResponse.username,
              name: userResponse.first_name,
              email: userResponse.email,
              userTitle: userResponse.user_title,
              phoneNo: userResponse.first_name,
              status: userResponse.status,
            });

            this.dataService
              .getLocations(this.userId.UserData.user_id)
              .subscribe((resData) => {
                this.locations = resData.results;
                console.log(userResponse.hospital);
                this.createUserForm.patchValue({
                  location: userResponse.hospital.HospitalId,
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
                      department: userResponse.department.DepartmentId,
                    });
                  });
              });

            this.dataService.getLanguages().subscribe((resData) => {
              this.languages = resData.results;
              this.createUserForm.patchValue({
                language: userResponse.language.language_id,
              });
            });

            this.dataService
              .getRoles(this.userId.UserData.user_id)
              .subscribe((resData) => {
                this.roles = resData;

                this.createUserForm.patchValue({
                  roles: userResponse.roles[0].role.role_id,
                });

                this.dataService
                  .getLevels(this.createUserForm.controls['roles'].value)
                  .subscribe((resData) => {
                    this.levels = resData;

                    this.createUserForm.patchValue({
                      level: userResponse.level.level_id,
                    });
                  });
              });
          });
      } else {
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
            this.roles = resData;

            this.createUserForm.patchValue({
              roles: this.roles[0].role_id,
            });

            this.dataService
              .getLevels(this.createUserForm.controls['roles'].value)
              .subscribe((resData) => {
                this.levels = resData;

                this.createUserForm.patchValue({
                  level: this.levels[0].level_id,
                });
              });
          });
      }
    });

    

    //end of ngOnInit
  }

  //When user location is changed
  onChangeUserLocation(changedUserLocation) {
    this.dataService
      .getDepartments(changedUserLocation, this.userId.UserData.user_id)
      .subscribe((resData) => {
        this.departments = resData.results;
        this.createUserForm.patchValue({
          department: this.departments[0].DepartmentId,
        });
      });
  }

  //when user change roles

  onChangeRoles(changedUserRoles) {
    this.dataService.postLevels(changedUserRoles).subscribe((resData: any) => {
      this.levels = resData.Message;
      this.createUserForm.patchValue({
        level: this.levels[0].level_id,
      });
    });
  }

  onCreate() {
    console.log(this.createUserForm.value);

    const body = {
      client_id: this.userId.UserData.client_id,
      username: this.createUserForm.controls['userName'].value,
      first_name: this.createUserForm.controls['name'].value,
      user_title: this.createUserForm.controls['userTitle'].value,
      email: this.createUserForm.controls['email'].value,
      status: this.createUserForm.controls['status'].value,
      mobilephone: this.createUserForm.controls['phoneNo'].value,
      preferredlanguage: this.createUserForm.controls['language'].value,
      level_id: this.createUserForm.controls['level'].value,
      hospital: +this.createUserForm.controls['location'].value,
      photo: !this.createUserForm.controls['uploadPhoto'].value
        ? ''
        : this.createUserForm.controls['uploadPhoto'].value,
      department: this.createUserForm.controls['department'].value,
      roles: [
        {
          role_id: this.createUserForm.controls['roles'].value,
        },
      ],
      dailysummary: false,
      dataupload: false,
      aim_signature: '',
      monthlyreport: false,
      is_ad_user: false,
      doctorplus: false,
      doctorminus: false,
      nurse: false,
      app: false,
      resident: false,
      yearlyreport: false,
      fyreport: false,
      quarterlyreport: false,
      otp_type: 1,
      threedayrevisit: false,
      physician_compliments_report: false,
      nurse_compliments_report: false,
      app_compliments_report: false,
      resident_compliments_report: false,
      technician_compliments_report: false,
      mail: false,
    };
    this.errorBox = false;
    this.successBox = false;
    if (this.paramId) {
      this.dataService
        .editUsers(body, this.paramId)
        .subscribe((resData: any) => {
          if (resData.Status == 0) {
            this.successBox = true;
            console.log(resData);
          } else {
            this.errorBox = true;
            this.errorMessage = 'An error occured';
          }
        });
    } else {
      this.dataService.postUsers(body).subscribe((resData: any) => {
        if (resData.Status == 0) {
          this.successBox = true;

          setTimeout(() => this.router.navigate(['sidebar/users']), 2000);

          this.createUserForm.reset();
        } else {
          this.errorBox = true;

          for (let key in resData.Message) {
            switch (key) {
              case 'email':
                this.errorEmail = resData.Message[key][0];
                this.errorUserName = '';
                break;

              case 'username':
                this.errorUserName = resData.Message[key][0];
                this.errorEmail = '';
                break;
            }
          }
        }
      });
    }
  }

  //back btn
  onBackToUsers() {
    this.router.navigate(['sidebar/users']);
  }
}
