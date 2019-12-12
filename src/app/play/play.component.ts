import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimerService } from '../core/timer.service';
import { Timer } from '../shared/timer';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  timer: Timer;

  constructor(
    private activatedRoute: ActivatedRoute,
    private timerService: TimerService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.timer = this.timerService.getTimer(params.get('timerId'));
    })
  }

}
