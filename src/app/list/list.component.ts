import { Component, OnInit } from '@angular/core';
import { Timer } from '../shared/timer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  timers: Timer[] = [];

  constructor() { }

  ngOnInit() {
    this.timers.push({
      name: 'Initial timer',
      id: 'init',
      sessions: []
    });
  }

}
