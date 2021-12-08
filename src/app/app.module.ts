import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GridModule } from "@progress/kendo-angular-grid";
import { HttpClientModule }   from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GridModule,
    HttpClientModule,
    ButtonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
