import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateUsersComponent } from './create-users/create-users.component';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, CreateUsersComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsersModule {}
