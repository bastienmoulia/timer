import { Component, OnInit } from '@angular/core';
import { Timer } from '../shared/timer';
import { TimerService } from '../core/timer.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  timers: Timer[] = [];

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.timers = this.timerService.getTimers();
  }
}
