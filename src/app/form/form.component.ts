import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Timer } from '../shared/timer';
import { Session } from '../shared/session';

const newSession: Session = {
  quantity: 10,
  duration: 10,
  pause: 5
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() timer: Timer;
  @Input() submitLabel = 'Create the timer';
  @Output() submitTimer = new EventEmitter<Timer>();

  constructor() {}

  ngOnInit() {}

  addSession() {
    this.timer.sessions.push(newSession);
  }

  removeSession(index: number) {
    this.timer.sessions.splice(index, 1);
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.submitTimer.emit(this.timer);
    }
  }
}
