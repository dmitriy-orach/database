import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {

  destroyed = new Subject();
  constructor() {}
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
