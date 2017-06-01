import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { ListBooksComponent } from './books/list-books/list-books.component';
import { LeftNavbarComponent } from './shared/left-navbar/left-navbar.component';
import { HomeComponent } from './home/home.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';
import { BooksComponent } from './books/books/books.component';
import {BooksService} from "./services/books.service";
import {BootstrapModalModule} from "ng2-bootstrap-modal";
import { ConfirmPopupComponent } from './shared/confirm-popup/confirm-popup.component';

const ROUTES = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', redirectTo: 'books', pathMatch: 'full'},
  { path: 'books', component: BooksComponent,
    children: [
      {path: '', component: ListBooksComponent},
      {path: 'add', component: EditBookComponent },
      {path: 'edit/:id', component: EditBookComponent }
    ] },
  { path: '**', redirectTo: 'login' }
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditBookComponent,
    ListBooksComponent,
    LeftNavbarComponent,
    HomeComponent,
    TopNavbarComponent,
    BooksComponent,
    ConfirmPopupComponent
  ],
  entryComponents: [ConfirmPopupComponent]  ,
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
