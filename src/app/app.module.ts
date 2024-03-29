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
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { PostModalWindowComponent } from './components/modals/post-modal-window/post-modal-window.component';
import { PostFormComponent } from './components/forms/post-form/post-form.component';
import { UserModalWindowComponent } from './components/modals/user-modal-window/user-modal-window.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { BaseComponent } from './components/base/base.component';
import { UserMapper } from './mappers/user.mapper';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { PostMapper } from './mappers/post.mapper';
import { InputComponent } from './components/input/input.component';
import { TextStyleBoldDirective } from './directives/text-style-bold.directive';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NotFoundComponent,
    UserInfoComponent,
    PostComponent,
    CommentComponent,
    PostModalWindowComponent,
    PostFormComponent,
    UserModalWindowComponent,
    UserFormComponent,
    BaseComponent,
    InputComponent,
    TextStyleBoldDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GridModule,
    HttpClientModule,
    ButtonsModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    ListViewModule,
    InputsModule,
    LabelModule
  ],
  providers: [
    UserMapper, 
    PostMapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
