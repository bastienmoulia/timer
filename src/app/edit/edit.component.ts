import { Component, OnInit } from '@angular/core';
import { Timer } from '../shared/timer';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerService } from '../core/timer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  timer: Timer;

  constructor(
    private activatedRoute: ActivatedRoute,
    private timerService: TimerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.timer = this.timerService.getTimer(params.get('timerId'));
    });
  }

  onSubmit(timer: Timer) {
    this.timerService.editTimer(timer);
    this.router.navigate(['/']);
  }
}
