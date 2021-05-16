import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {
  quesAns$!: Observable<any>;
  isReviewDisabled = true;

  firstFormGroup = this._formBuilder.group({
    review: [{ value: '', disabled: this.isReviewDisabled }, Validators.required],
    question1: ['', Validators.required],
    question2: ['', Validators.required],
    question3: ['', Validators.required],
    improvement: [''],
  });
  isEditable = false;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
  private backend: BackendService) { }

  ngOnInit(): void {
    this.quesAns$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => this.backend.getReviewDetails(this.route.snapshot.paramMap.get('id')).subscribe(s => { this.firstFormGroup.patchValue(s) })),
      switchMap((params: ParamMap) =>
        this.backend.getWritingQuestionAnswer(params.get('id')))
    );
  }

  startReview() {
    this.firstFormGroup.get('review')?.enable()
    this.isReviewDisabled = false
  }

  submitReview() {
    this.backend.saveReview(this.firstFormGroup.value)
  }
}
