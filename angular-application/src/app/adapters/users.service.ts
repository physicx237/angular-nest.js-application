import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../interfaces/user.dto';
import { UsersServicePort } from '../domain/ports/users-service.port';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UsersServicePort {
  apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  updateUser(userDto: UserDto) {
    const token = localStorage.getItem('access_token');

    return this.httpClient.put(this.apiUrl, userDto, {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    });
  }
}
