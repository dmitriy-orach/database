import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  public title: string = 'Page not found';
  public text: string = 'The address is incorrectly typed or such a page on the site no longer exists.';
}
