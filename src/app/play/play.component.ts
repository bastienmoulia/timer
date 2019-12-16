import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimerService } from '../core/timer.service';
import { Timer } from '../shared/timer';

const INTERVAL = 100;

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {
  timer: Timer;
  path: string;
  currentSession = 1;
  currentExercice = 1;
  progress = 0;
  started = false;
  interval: number;
  work = true;

  constructor(private activatedRoute: ActivatedRoute, private timerService: TimerService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.timer = this.timerService.getTimer(params.get('timerId'));
    });
    this.generatePath(this.progress);
  }

  ngOnDestroy() {
    window.clearInterval(this.interval);
  }

  start() {
    this.started = true;
    this.interval = window.setInterval(() => this.update(), INTERVAL);
  }

  pause() {
    this.started = false;
    window.clearInterval(this.interval);
  }

  private update() {
    let delta = 0;
    if (this.work) {
      delta = (INTERVAL / this.timer.sessions[this.currentSession - 1].duration) * 0.001;
    } else {
      delta = -((INTERVAL / this.timer.sessions[this.currentSession - 1].pause) * 0.001);
    }
    this.progress += delta;
    if (this.progress >= 1) {
      this.progress = 0.999;
      this.work = false;
    } else if (this.progress <= 0) {
      this.progress = 0;
      this.work = true;
      this.next();
    }
    this.generatePath(this.progress);
  }

  private next() {
    this.currentExercice++;
    if (this.currentExercice === this.timer.sessions[this.currentSession - 1].quantity + 1) {
      this.currentExercice = 1;
      this.currentSession++;
      if (this.currentSession === this.timer.sessions.length + 1) {
        this.currentSession = 1;
        this.pause();
      }
    }
  }

  private generatePath(progress: number) {
    this.path = this.arcPath([50, 50], [45, 45], [-Math.PI / 2, progress * 2 * Math.PI], 0);
  }

  private arcPath([cx, cy]: number[], [rx, ry]: number[], [t1, Δ]: number[], φ: number) {
    const cos = Math.cos;
    const sin = Math.sin;
    const π = Math.PI;
    const fMatrixTimes = ([[a, b], [c, d]]: number[][], [x, y]: number[]) => [
      a * x + b * y,
      c * x + d * y
    ];
    const fRotateMatrix = (x: number) => {
      return [
        [cos(x), -sin(x)],
        [sin(x), cos(x)]
      ];
    };
    const fVecAdd = ([a1, a2]: number[], [b1, b2]: number[]) => [a1 + b1, a2 + b2];
    Δ = Δ % (2 * π);
    const rotMatrix = fRotateMatrix(φ);
    const [sX, sY] = fVecAdd(fMatrixTimes(rotMatrix, [rx * cos(t1), ry * sin(t1)]), [cx, cy]);
    const [eX, eY] = fVecAdd(fMatrixTimes(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]), [
      cx,
      cy
    ]);
    const fA = Δ > π ? 1 : 0;
    const fS = Δ > 0 ? 1 : 0;
    return 'M ' + sX + ' ' + sY + ' A ' + [rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(' ');
  }
}
