import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpDto } from '../interfaces/sign-up.dto';
import { SignUpServicePort } from '../domain/ports/sign-up-service.port';

@Injectable({
  providedIn: 'root',
})
export class SignUpService implements SignUpServicePort {
  apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  signUp(signUpDto: SignUpDto) {
    return this.httpClient.post<any>(this.apiUrl, signUpDto);
  }
}
