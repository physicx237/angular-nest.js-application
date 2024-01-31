import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SignInService } from '../../adapters/sign-in.service';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(
    private signInService: SignInService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    setInterval(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnInit() {
    this.signInService.getUser().subscribe((user: User) => {
      console.log(user);

      this.user = user;
    });
  }
}
