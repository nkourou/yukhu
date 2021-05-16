import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-speaking',
  templateUrl: './speaking.component.html',
  styleUrls: ['./speaking.component.css']
})
export class SpeakingComponent implements OnInit {
  isReviewDisabled = true;

  quesAns$!: Observable<any>;
  displayedColumns: string[] = ['part','question_text', 'answerAudioPath'];
  firstFormGroup = this._formBuilder.group({
    review: [{ value: '', disabled: this.isReviewDisabled }, Validators.required],
    question1: ['', Validators.required],
    question2: ['', Validators.required],
    question3: ['', Validators.required],
    improvement: [''],
  });;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
  public backend: BackendService) { }

  ngOnInit(): void {
    this.quesAns$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => this.backend.getReviewDetails(this.route.snapshot.paramMap.get('id')).subscribe(s => { this.firstFormGroup.patchValue(s) })),
      switchMap((params: ParamMap) =>
        this.backend.getSpeakingQuestionAnswer(params.get('id')))
    );
    
  }

  startReview() {
    this.firstFormGroup.get('review')?.enable()
    this.isReviewDisabled = false
  }

  submitReview() {
    this.backend.showLoading()
    this.backend.saveReview(this.firstFormGroup.value).subscribe(() => {
      this.backend.refreshQueue()
      this.backend.hideLoading()
    })
  }

}
