import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'app/shared/loading-spinner/services/data-storage.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageServices: DataStorageService
  ) {}

  ngOnInit(): void {}

  addNewQuestion() {
    this.router.navigate(['sidebar/questions/add']);
    console.log('true');
  }
}
