import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';

import { sidebarModule } from './sidebar/sidebar.module';
import { DashBoardComponent } from './dash-board/dash-board.component';

import { questionModule } from './questions/question-add-new/question.module';
import { Surveymodule } from './survey/survey.module';

import { UsersModule } from './users/users.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { TakeSurveyComponent } from './take-survey/take-survey.component';

@NgModule({
  declarations: [AppComponent, DashBoardComponent, TakeSurveyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    sidebarModule,
    questionModule,
    Surveymodule,
    UsersModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
