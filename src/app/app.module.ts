import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';

import { sidebarModule } from './sidebar/sidebar.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionTableComponent } from './questions/question-table/question-table.component';
import { QuestionSubjectiveComponent } from './questions/question-subjective/question-subjective.component';

@NgModule({
  declarations: [AppComponent, DashBoardComponent, QuestionsComponent, QuestionTableComponent, QuestionSubjectiveComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    sidebarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
