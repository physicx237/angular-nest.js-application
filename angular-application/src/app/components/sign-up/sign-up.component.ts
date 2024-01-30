import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpService } from '../../adapters/sign-up.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    patronymic: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(private signUpService: SignUpService) {}

  onSubmit() {
    const signUpFormValue = this.signUpForm.getRawValue();

    this.signUpService.signUp(signUpFormValue).subscribe((user) => {
      console.log(user);
    });
  }
}
