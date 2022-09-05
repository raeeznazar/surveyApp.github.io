import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { SurveyComponent } from './survey.component';
import { SurveyQuestionsSettingsComponent } from './survey-questions-settings/survey-questions-settings.component';

@NgModule({
  declarations: [
    SurveyComponent,
    AddSurveyComponent,
    SurveyQuestionsSettingsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class Surveymodule {}
