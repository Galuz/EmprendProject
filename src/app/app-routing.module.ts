import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './auth/login/login.component'; 
import { RegisterComponent } from './auth/register/register.component';
import { ShareIdeasComponent } from './pages/share-ideas/share-ideas.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'share', component: ShareIdeasComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
