import { Component, OnInit } from '@angular/core';
import { Timer } from '../shared/timer';
import { Session } from '../shared/session';
import { TimerService } from '../core/timer.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

const newSession: Session = {
  quantity: 10,
  duration: 10,
  pause: 5
};

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  newTimer: Timer = null;

  constructor(
    private timerService: TimerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newTimer = {
      name: '',
      id: '',
      sessions: [newSession]
    };
  }

  addSession() {
    this.newTimer.sessions.push(newSession);
  }

  removeSession(index: number) {
    this.newTimer.sessions.splice(index, 1);
  }

  create(form: NgForm) {
    if (form.valid) {
      this.timerService.addTimer(this.newTimer);
      this.router.navigate(['/']);
    }
  }

}
