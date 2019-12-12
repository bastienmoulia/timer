import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Timer } from '../shared/timer';

const STORAGE_KEY = 'timers';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  getTimers(): Timer[] {
    if (!this.storage.has(STORAGE_KEY)) {
      this.initTimers();
    }
    return this.storage.get(STORAGE_KEY);
  }

  getTimer(timerId: string): Timer {
    const timers = this.getTimers();
    return timers.find(timer => timer.id === timerId);
  }

  setTimers(timers: Timer[]) {
    this.storage.set(STORAGE_KEY, timers);
  }

  initTimers() {
    const timer = {
      name: 'Initial timer',
      id: '',
      sessions: []
    };
    timer.id = this.generateId();
    this.setTimers([timer]);
  }

  addTimer(timer: Timer) {
    const timers = this.getTimers();
    timer.id = this.generateId();
    timers.splice(0, 0, timer);
    this.setTimers(timers);
  }

  deleteTimer(timerId: string) {
    const timers = this.getTimers();
    const timersFiltered = timers.filter(timer => timer.id !== timerId);
    this.setTimers(timersFiltered);
  }

  editTimer(timerEdited: Timer) {
    const timers = this.getTimers();
    timers.forEach(timer => {
      if (timer.id === timerEdited.id) {
        timer = timerEdited;
      }
    });
    this.setTimers(timers);
  }

  private generateId(): string {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }
}
