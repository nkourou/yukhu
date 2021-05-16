import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-ques-ans',
  templateUrl: './ques-ans.component.html',
  styleUrls: ['./ques-ans.component.css']
})
export class QuesAnsComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
