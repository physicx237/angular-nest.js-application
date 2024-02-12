import { Observable } from 'rxjs';
import { UserDto } from '../../interfaces/user.dto';

export interface UsersServicePort {
  updateUser(userDto: UserDto): Observable<any>;
}
