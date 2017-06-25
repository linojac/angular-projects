import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {RegisterPanelComponent} from './user/register-panel/register-panel.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {SuccessMessagePanelComponent} from './shared/success-message-panel/success-message-panel.component';
import {AboutUsComponent} from './shared/about-us/about-us.component';
import {LoginPanelComponent} from './user/login-panel/login-panel.component';

const routes:Routes = [
{path: '',  redirectTo: 'home', pathMatch: 'full' },
{path: 'home',  component:HomeComponent },
{path: 'login',  component:LoginPanelComponent },
{path: 'register', component:RegisterPanelComponent},
{path: 'success-stories', component:SuccessMessagePanelComponent},
{path: 'about-us', component:AboutUsComponent},
{path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class RoutingModule {}
