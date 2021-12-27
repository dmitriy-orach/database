import { Component, ContentChild, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  public opened = false;
  
  @ContentChild(TemplateRef) template: TemplateRef<ViewContainerRef>;
  
  @Input() public btnText: string;
  @Input() public title: string;
  constructor() { }

  ngOnInit(): void {
  }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {

  }
}
