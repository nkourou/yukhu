import { Component } from '@angular/core';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yukhu';
  isExpanded = true
  feedback = ''
  feedbackSubmitBtnTxt = 'Submit'

  constructor(private backend: BackendService) {

  }

  saveFeedback(ev: Event) {
    ev.stopPropagation();
    this.backend.sendFeedback(this.feedback).subscribe(() => {
      this.feedbackSubmitBtnTxt = 'Done'
      this.feedback = ''
      setTimeout(() => {
        this.feedbackSubmitBtnTxt = 'Submit'
      }, 3000)
    })
  }
}
