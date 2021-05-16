import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// import { SpeakingAssessment, WritingAssessment } from '../../../../chuka/types';
const SERVER_URL = 'http://localhost:3000/api/v1'

export interface Queue {
  id: number
  name: string
  date_submitted: Date
  type: string
}

const QUEUE_DATA = [
  {
    id: 0,
    name: 'Audio question',
    date_submitted: new Date('2013-01-31T12:34:56.78+0530'),
    type: 'speaking'
  },
  {
    id: 1,
    name: 'Writing question',
    date_submitted: new Date('1/18/16'),
    type: 'writing'
  },
] as Queue[];

const REVIEWED_DATA = [
  {
    id: 0,
    question_text: 'Audio question',
    date_reviewed: new Date('2013-01-31T12:34:56.78+0530'),
    type: 'speaking'
  },
  {
    id: 1,
    question_text: 'Writing question',
    date_reviewed: new Date('1/18/16'),
    type: 'writing'
  },
];

const WRITING_QA = {
  id: 1,
  date_submitted: new Date(),
  date_picked_for_review: new Date(),
  date_assessed: new Date(),

  status: 'waiting',
  reviewer: '',
  review: '',
  band_score: -1,

  type: 'writing',
  part: 'Writing Task 1',
  question_text: 'Who is Shiba ?',
  answer_text: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
  A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`
}

const SPEAKING_QA = {
  id: 0,
  type: 'speaking',
  date_submitted: new Date(),

  date_picked_for_review: new Date(),
  date_assessed: new Date(),
  status: 'waiting',

  reviewer: '',
  review: '',
  band_score: -1,

  questions: [
    {
      id: 0, answerAudioPath: 'https://storage.googleapis.com/kubi-speech/audio_questions/holidays-male/part1.mp3', type: 'speaking', maxResponseDuration: 10000, question_text: 'How you doing today ?', part: 'short', date_submitted: new Date(), waitBeforeStartRecordingDuration: 1000,
      questionAudioPath: '',
      answerAudio: new Blob(), duration: 1
    },
    {
      id: 1, answerAudioPath: 'https://storage.googleapis.com/kubi-speech/audio_questions/holidays-male/part2.mp3', type: 'speaking', maxResponseDuration: 300000, question_text: 'Tell me about a time you went on holiday ?', part: 'main', date_submitted: new Date(),waitBeforeStartRecordingDuration: 15000,
      questionAudioPath: '',
      answerAudio: new Blob(), duration: 1
    },
    {
      id: 2, answerAudioPath: 'https://storage.googleapis.com/kubi-speech/audio_questions/holidays-male/part3.mp3', type: 'speaking', maxResponseDuration: 15000, question_text: 'Do you think holidays are good for mental health ?', part: 'follow-up', date_submitted: new Date(),waitBeforeStartRecordingDuration: 1000,
      questionAudioPath: '',
      answerAudio: new Blob(), duration: 1
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  reviewerId = '';
  private _queue = new BehaviorSubject<Queue[]>(QUEUE_DATA)
  public queue$ = this._queue.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor(private http: HttpClient) {
    this._queue.next(QUEUE_DATA)
  }

  getWritingQuestionAnswer(questionId: string | null) {
    // return this.http.get(`${SERVER_URL}/question/${questionId}`)
    return of(WRITING_QA)    
  }
  
  getSpeakingQuestionAnswer(questionId: string | null) {
    return of(SPEAKING_QA)
    // return this.http.get(`${SERVER_URL}/question/${questionId}`)
  }

  saveReview(review: FormData) {
    return of(0).pipe(delay(3000))
    // return this.http.post(`${SERVER_URL}/${this.reviewerId}`, review)
  }

  getAllReviews() {
    return of(REVIEWED_DATA)
    // return this.http.get(`${SERVER_URL}/evaluations/all/${this.reviewerId}`)
  }

  getReviewDetails(reviewId: string | null) {
    return of({review: 'gaa', improvement: 'googo', question1: 'Auto'})
    // return of({})
    // return this.http.get(`${SERVER_URL}/evaluations/${reviewId}`)
  }

  markReviewInProgress(reviewId: string) {
    return this.http.get(`${SERVER_URL}/evaluations/markinprogress/${reviewId}`)
  }

  markReviewNotStarted(reviewId: string) {
    return this.http.get(`${SERVER_URL}/evaluations/marknotstarted/${reviewId}`)
  }

  sendFeedback(feedback: string) {
    return this.http.post(`${SERVER_URL}/feedback`, {feedback: feedback})
  }

  getQueue() {
    return of(QUEUE_DATA.splice(0, 1))
    // return this.http.get(`${SERVER_URL}/queue`)
  }

  refreshQueue() {
    this.getQueue().subscribe((q) => this._queue.next(q))
  }

  showLoading() {
    this._loading.next(true);
  }

  hideLoading() {
    this._loading.next(false);
  }

}
