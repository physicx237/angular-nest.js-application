import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, title: 'Регистрация' },
  { path: 'sign-in', component: SignInComponent, title: 'Вход' },
  { path: 'profile', component: ProfileComponent, title: 'Профиль' },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];
