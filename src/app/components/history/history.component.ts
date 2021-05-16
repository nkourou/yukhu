import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'date_reviewed', 'type', 'question_text'];
  dataSource$!: Observable<any>;;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.dataSource$ = this.backend.getAllReviews()
  }

}