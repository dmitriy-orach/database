import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  public isModalOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public open(): void {
    this.isModalOpened.next(true);
  }

  public close(): void {
    this.isModalOpened.next(false);
  }

  public getModalWindowStatus(): Observable<boolean> {
    return this.isModalOpened.asObservable();
  }
}
