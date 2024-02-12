import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../../adapters/sign-in.service';
import { Token } from '../../types/token.type';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, InputMaskModule, PasswordModule, ButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  signInForm = new FormGroup({
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(private signInService: SignInService, private router: Router) {}

  onSubmit() {
    const signInFormValue = this.signInForm.getRawValue();

    this.signInService.signIn(signInFormValue).subscribe((token: Token) => {
      localStorage.setItem('access_token', token.access_token);

      this.router.navigateByUrl('/profile');
    });
  }

  signUpPage() {
    this.router.navigateByUrl('/sign-up');
  }
}
