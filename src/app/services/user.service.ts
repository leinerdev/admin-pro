import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterFormRq } from '../interfaces/register-form.interface';
import { LoginFormRq } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.baseUrl;
  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit()
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  get uid(): string {
    return this.user._id || '';
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "493473356823-lttar1muqutsbuev39mmfg69s42oas6h.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
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
    return this.http.get(`${this.URL}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        const { email, google, name, role, img = '', _id } = response.user;
        this.user = new User( name, email, '', img, _id, google, role );
        return true;
      }),
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

  updateUser(data: { email: string, name: string, role: string }) {
    data = {
      ...data,
      role: this.user.role!
    }
    return this.http.put(`${this.URL}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
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
