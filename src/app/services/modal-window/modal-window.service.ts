import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {

  constructor() { }

  public open(): boolean {
    return true;
  }

  public close(): boolean {
    return false;
  }
}
