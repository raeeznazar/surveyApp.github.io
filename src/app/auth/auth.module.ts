import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { LoadingSpinnerComponent } from 'app/shared/loading-spinner/loading-spinner.component';

import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
})
export class AuthModule {}
