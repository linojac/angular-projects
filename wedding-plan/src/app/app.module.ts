import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RoutingModule} from './routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopNavPanelComponent } from './shared/top-nav-panel/top-nav-panel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginPanelComponent } from './user/login-panel/login-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavPanelComponent,
    FooterComponent,
    LoginPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
