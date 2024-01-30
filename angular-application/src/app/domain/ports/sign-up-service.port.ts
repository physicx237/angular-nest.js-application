import { Observable } from 'rxjs';
import { SignUpDto } from '../../interfaces/sign-up.dto';

export interface SignUpServicePort {
  signUp(signUpDto: SignUpDto): Observable<any>;
}
