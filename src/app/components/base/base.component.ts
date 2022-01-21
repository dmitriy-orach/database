import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {
  public destroyed = new Subject<void>();

  public ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
