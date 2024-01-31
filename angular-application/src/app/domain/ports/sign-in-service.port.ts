import { Observable } from 'rxjs';
import { SignInDto } from '../../interfaces/sign-in.dto';
import { Token } from '../../types/token.type';
import { User } from '../../types/user.type';

export interface SignInServicePort {
  signIn(signInDto: SignInDto): Observable<Token>;

  getUser(): Observable<User>;
}
