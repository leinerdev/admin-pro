import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(protected http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  search(type: 'users' | 'doctors' | 'hospitals', term: string = '') {
    const url = `${ environment.baseUrl }/all/collection/${ type }/${ term }`
    return this.http.get<any[]>(url, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((response: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(response.results)
        
          default:
            return [];
        }
      })
    )
  }

  private transformUsers(results: any[]): User[] {

    return results.map(user => new User(
      user.name,
      user.email,
      '',
      user.img,
      user._id,
      user.google,
      user.role
    ))
  }
}
