import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextStyleBold]'
})
export class TextStyleBoldDirective {

  constructor(private el: ElementRef, private r: Renderer2) {
    this.r.setStyle(el.nativeElement, 'font-weight' , 800)
  }

}
