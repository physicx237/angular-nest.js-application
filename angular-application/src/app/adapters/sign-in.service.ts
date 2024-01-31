import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto } from '../interfaces/sign-in.dto';
import { Token } from '../types/token.type';
import { SignInServicePort } from '../domain/ports/sign-in-service.port';
import { User } from '../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignInService implements SignInServicePort {
  signInApiUrl = 'http://localhost:3000/auth/sign-in';

  getUserApiUrl = 'http://localhost:3000/auth/profile';

  constructor(private httpClient: HttpClient) {}

  signIn(signInDto: SignInDto) {
    return this.httpClient.post<Token>(this.signInApiUrl, signInDto);
  }

  getUser() {
    const token = localStorage.getItem('access_token');

    return this.httpClient.get<User>(this.getUserApiUrl, {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    });
  }
}
