import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });;
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });;
  isEditable = false;

  constructor(private _formBuilder: FormBuilder, private backend: BackendService) {}

  ngOnInit() {
  }

  submit() {

  }

}
