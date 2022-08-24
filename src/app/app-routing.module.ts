import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { QuestionAddNewComponent } from './questions/question-add-new/question-add-new.component';

import { QuestionTableComponent } from './questions/question-table/question-table.component';
import { QuestionsComponent } from './questions/questions.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddSurveyComponent } from './survey/add-survey/add-survey.component';
import { SurveyQuestionsSettingsComponent } from './survey/survey-questions-settings/survey-questions-settings.component';
import { SurveyComponent } from './survey/survey.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/sidebar', pathMatch: 'full' },
  {
    path: 'sidebar',
    component: SidebarComponent,
    children: [
      { path: '', component: DashBoardComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'questionTable', component: QuestionTableComponent },

      { path: 'questions/add', component: QuestionAddNewComponent },
      { path: 'survey', component: SurveyComponent },
      { path: 'survey/add', component: AddSurveyComponent },
      { path: 'survey/settings', component: SurveyQuestionsSettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: CreateUsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
