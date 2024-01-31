import { Observable } from 'rxjs';
import { SignInDto } from '../../interfaces/sign-in.dto';
import { Token } from '../../types/token.type';
import { User } from '../models/user.model';

export interface SignInServicePort {
  signIn(signInDto: SignInDto): Observable<Token>;

  getUser(): Observable<User>;
}
