import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, title: 'Sign Up' },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
];
