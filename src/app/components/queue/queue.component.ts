import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

export interface Section {
  id: number
  name: string;
  updated: Date;
  type: string
}


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor(public backend: BackendService) {
  }

  ngOnInit(): void {
   }

}
