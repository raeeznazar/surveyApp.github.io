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

  postLevels(roleIdSelectedFromRoleSelectInput) {
    const url = environment.LEVELS_API;
    const body = { roles: [{ role_id: roleIdSelectedFromRoleSelectInput }] };
    return this.http.post(url, body);
  }

  postUsers(body) {
    const url = environment.USERS_API;

    return this.http.post(url, body);
  }

  editUsers(body, userId) {
    const url = environment.USERS_API + userId + '/';

    return this.http.put(url, body);
  }

  deleteUsers(user_id) {
    const url = environment.USERS_API + user_id + '/';
    return this.http.delete(url);
  }

  getUserById(user_id) {
    const url = environment.USERS_API + user_id + '/';
    return this.http.get(url);
  }
  postQuestions(body) {
    const url = environment.QUESTIONS_API;
    return this.http.post(url, body);
  }

  editQuestion(questionid, body) {
    const url =
      environment.QUESTIONS_API +
      questionid +
      '/?initial_copy_flag=1&secondary_copy_flag=1';
    return this.http.put(url, body);
  }

  deleteQuestion(questionid) {
    const url = environment.QUESTIONS_DELETE_API + questionid + '/';
    return this.http.delete(url);
  }

  getQuestionsById(questionid) {
    const url = environment.QUESTIONS_DELETE_API + questionid + '/';
    return this.http.get(url);
  }

  getCloneForm() {
    const url = environment.SURVEYS_API + '?page_size=200';
    return this.http.get(url);
  }

  getAge() {
    const url = environment.AGE_API;
    return this.http.get(url);
  }

  postSurvey(body: any, cloneFromId) {
    let templateid = cloneFromId == 0 ? '' : cloneFromId;
    const url = environment.SURVEYS_API + '?templateid=' + templateid;
    return this.http.post(url, body);
  }
  deleteSurvey(surveyDefinitionId: any) {
    const url = environment.SURVEYS_API + surveyDefinitionId + '/';
    return this.http.delete(url);
  }

  getSurveyById(surveyDefinitionId) {
    const url = environment.SURVEYS_API + surveyDefinitionId + '/';
    return this.http.get(url);
  }
  putServey(body, surveyDefinitionId) {
    const url = environment.SURVEYS_API + surveyDefinitionId + '/';
    return this.http.put(url, body);
  }

  // getSurveyQuestion(surveydefinitionid){
  //   const url =  environment.QUESTIONS_API + surveydefinitionid + '/';
  //   return this.http.get(url);
  // }
  getSurveyQuestions(surveyDefinitionId) {
    const url =
      environment.SURVEY_QUESTIONS_API +
      '?surveydefinitionid=' +
      surveyDefinitionId;
    return this.http.get(url);
  }

  // Function to save survey questions in survey settings
  saveSurveyQuestions(body) {
    const url = environment.SURVEY_QUESTIONS_API;
    return this.http.post(url, body);
  }

  //take survey

  getTakeSurveyQuestion(token) {
    const url = environment.TAKE_SURVEY_QUESTIONS_API + '?token=' + token;
    return this.http.get(url);
  }

  postSurveDetails(body, token) {
    const url = environment.SURVEY_REPLAY_POST + '?token=' + token;
    return this.http.post(url, body);
  }
}
