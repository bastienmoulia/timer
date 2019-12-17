import { Component, OnInit } from '@angular/core';
import { Timer } from '../shared/timer';
import { TimerService } from '../core/timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  timer: Timer = {
    name: '',
    id: '',
    sessions: [
      {
        quantity: 10,
        duration: 10,
        pause: 5
      }
    ]
  };

  constructor(private timerService: TimerService, private router: Router) {}

  ngOnInit() {}

  onSubmit(timer: Timer) {
    this.timerService.addTimer(timer);
    this.router.navigate(['/']);
  }
}
