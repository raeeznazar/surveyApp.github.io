import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { environment } from 'environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  ////table users
  getUsers(user_id, client_id, hospitalId, departmentId, status) {
    const url =
      environment.USERS_API +
      '?user_id=' +
      user_id +
      '&client_id=' +
      client_id +
      '&hospital=' +
      hospitalId +
      '&department=' +
      departmentId +
      '&status=' +
      status;

    return this.http
      .get<any>(url)

      .pipe
      // other operators can add here
      ();
  }

  ///location select box
  getLocations(user_id) {
    const url = environment.DROP_DOWN_LOCATION_API + '?user_id=' + user_id;

    return this.http.get<any>(url);
  }

  //department select box
  getDepartments(hospitalId, user_id) {
    const url =
      environment.DROP_DOWN_LOCATION_DEPARTMENT +
      '?HospitalId=' +
      hospitalId +
      '&user_id=' +
      user_id;
    return this.http.get<any>(url);
  }

  getSurveyType(client_id: any) {
    const url = environment.SURVEY_TYPE_API + '?clientid=' + client_id;

    return this.http.get<any>(url);
  }

  getSurvey(hospitalId, departmentId, type) {
    const url =
      environment.SURVEYS_API +
      '?page=1&page_size=100' +
      '&hospitalid=' +
      hospitalId +
      '&departmentid=' +
      departmentId +
      '&type=' +
      type;

    return this.http.get<any>(url);
  }

  getQuestions() {
    const url = environment.QUESTIONS_API;

    return this.http.get<any>(url);
  }

  getLanguages() {
    const url = environment.LANGUAGES_API;
    return this.http.get<any>(url);
  }

  getRoles(user_id) {
    const url = environment.ROLES_API + '?status=0' + '&user_id=' + user_id;
    return this.http.get<any>(url);
  }

  getLevels(role_id) {
    const url = environment.LEVELS_API + '?role_id=' + role_id;
    return this.http.get<any>(url);
  }

  postLevels( roleIdSelectedFromRoleSelectInput) {
    const url = environment.LEVELS_API;
    const body = { roles: [{ role_id: roleIdSelectedFromRoleSelectInput }] };
    return this.http.post(url, body);
  }
}
