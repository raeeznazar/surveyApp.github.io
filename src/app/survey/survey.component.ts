import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // btn to add survey
  onAddSurvey() {
    this.router.navigate(['sidebar/survey/add']);
  }

  // btn for survey setting
  onSurveySettings() {
    this.router.navigate(['sidebar/survey/settings']);
  }
}
