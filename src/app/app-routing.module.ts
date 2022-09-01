import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

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
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },

  {
    path: 'sidebar',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'questionTable', component: QuestionTableComponent },

      { path: 'questions/add', component: QuestionAddNewComponent },
      { path: 'survey', component: SurveyComponent },
      { path: 'survey/add', component: AddSurveyComponent },
      { path: 'survey/settings', component: SurveyQuestionsSettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: CreateUsersComponent },
      {
        path: 'users/create/:hId/:dId/:userId',
        component: CreateUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
