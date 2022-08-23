import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionTableComponent } from '../question-table/question-table.component';
import { QuestionsComponent } from '../questions.component';
import { QuestionAddNewComponent } from './question-add-new.component';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionTableComponent,
   
    QuestionAddNewComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule],
})
export class questionModule {}
