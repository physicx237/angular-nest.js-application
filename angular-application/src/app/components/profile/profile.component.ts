import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../../adapters/sign-in.service';
import { User } from '../../domain/models/user.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProfileEditorComponent } from '../profile-editor/profile-editor.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule, ButtonModule],
  providers: [DialogService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  user!: User;

  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private signInService: SignInService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.signInService.getUser().subscribe((user: User) => {
      this.user = user;

      this.changeDetectorRef.detectChanges();
    });
  }

  signInPage() {
    localStorage.removeItem('access_token');

    this.router.navigateByUrl('/sign-in');
  }

  profileEditor() {
    this.ref = this.dialogService.open(ProfileEditorComponent, {
      header: 'Редактор профиля',
      data: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        patronymic: this.user.patronymic,
        phoneNumber: this.user.phoneNumber,
        password: this.user.password,
      },
    });

    this.ref.onClose.subscribe((user: User) => {
      this.user = user;

      this.changeDetectorRef.detectChanges();
    });
  }
}
