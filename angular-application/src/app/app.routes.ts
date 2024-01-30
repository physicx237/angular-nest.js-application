import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
];
