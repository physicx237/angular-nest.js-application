import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import {
  DynamicDialogRef,
  DialogService,
  DynamicDialogComponent,
} from 'primeng/dynamicdialog';
import { UsersService } from '../../adapters/users.service';
import { SignInService } from '../../adapters/sign-in.service';
import { Token } from '../../types/token.type';
import { User } from '../../domain/models/user.model';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditorComponent implements OnInit {
  instance: DynamicDialogComponent;

  profileEditorForm = new FormGroup({
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

  constructor(
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    private usersService: UsersService,
    private signInService: SignInService
  ) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit() {
    if (this.instance && this.instance.data) {
      this.profileEditorForm.patchValue({
        firstName: this.instance.data['firstName'],
        lastName: this.instance.data['lastName'],
        patronymic: this.instance.data['patronymic'],
        phoneNumber: this.instance.data['phoneNumber'],
        password: this.instance.data['password'],
      });
    }
  }

  onSubmit() {
    const profileEditorFormValue = this.profileEditorForm.getRawValue();

    this.usersService
      .updateUser(profileEditorFormValue)
      .pipe(
        concatMap(() =>
          this.signInService.signIn({
            phoneNumber: profileEditorFormValue.phoneNumber,
            password: profileEditorFormValue.password,
          })
        ),
        concatMap((token: Token) => {
          localStorage.setItem('access_token', token.access_token);

          return this.signInService.getUser();
        })
      )
      .subscribe((user: User) => {
        this.ref.close(user);
      });
  }
}
