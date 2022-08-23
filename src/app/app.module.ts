import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';

import { sidebarModule } from './sidebar/sidebar.module';
import { DashBoardComponent } from './dash-board/dash-board.component';

import { questionModule } from './questions/question-add-new/question.module';

@NgModule({
  declarations: [AppComponent, DashBoardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    sidebarModule,
    questionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
