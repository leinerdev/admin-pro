import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterFormRq } from '../interfaces/register-form.interface';
import { LoginFormRq } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit()
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "493473356823-lttar1muqutsbuev39mmfg69s42oas6h.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.loginGoogle(response.credential).subscribe({
      next: (response) => {
        // console.log({login: response});
        this.router.navigateByUrl('/');
      },
    })
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('leinerbarrios99.ljbm@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

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
