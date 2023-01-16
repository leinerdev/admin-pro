import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { RegisterFormRq } from '../interfaces/register-form.interface';
import { LoginFormRq } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.URL}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      }),
      map(response => true),
      catchError(error => of(false))
    )
  }

  createUser(formData: RegisterFormRq): Observable<any> {
    return this.http.post(`${this.URL}/users`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  login(formData: LoginFormRq): Observable<any> {
    return this.http.post(`${this.URL}/login`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  loginGoogle(token: string): Observable<any> {
    return this.http.post(`${this.URL}/login/google`, { token }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    )
  }
}
