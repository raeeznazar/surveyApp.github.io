import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  loginDate: any;
  questions = '';

  surveyCount = '';
  usersCount = '';
  localStorage: any = '';
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {
    this.loginDate = new Date();
  }

  ngOnInit(): void {
    this.localStorage = JSON.parse(localStorage.getItem('userData'));
    this.dataStorageService.getQuestions().subscribe((question) => {
      this.questions = question.length;
    });

    this.dataStorageService
      .getUsers(
        this.localStorage.UserData.user_id,
        this.localStorage.UserData.client_id,
        '',
        '',
        ''
      )
      .subscribe((user) => {
        this.usersCount = user.length;
      });

    this.dataStorageService.getSurvey('', '', 0).subscribe((survey) => {
      this.surveyCount = survey.results.length;
    });
  }

  gotToQuestions() {
    this.router.navigate(['sidebar/questions']);
  }

  goToSurvey() {
    this.router.navigate(['sidebar/survey']);
  }
  goToUsers() {
    this.router.navigate(['sidebar/users']);
  }
}
