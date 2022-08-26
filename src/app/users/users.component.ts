import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.getUsers().subscribe((resData) => {
      console.log(resData);
    });
  }

  onCreateUsers() {
    this.router.navigate(['sidebar/users/create']);
    console.log('trye');
  }
}
