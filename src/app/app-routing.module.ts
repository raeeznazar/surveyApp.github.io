import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { QuestionAddNewComponent } from './questions/question-add-new/question-add-new.component';

import { QuestionTableComponent } from './questions/question-table/question-table.component';
import { QuestionsComponent } from './questions/questions.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: '', redirectTo: '/sidebar', pathMatch: 'full' },
  {
    path: 'sidebar',
    component: SidebarComponent,
    children: [
      { path: '', component: DashBoardComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'questionTable', component: QuestionTableComponent },

      { path: 'question/add', component: QuestionAddNewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
