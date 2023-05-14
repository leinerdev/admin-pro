import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getHospitals() {
    const url = `${ environment.baseUrl }/hospitals`
    return this.http.get<any>(url, this.headers).pipe(
      map((res: { ok: boolean, hospitals: Hospital[] }) => res.hospitals)
    )
  }

  createHospital(name: string) {
    const url = `${ environment.baseUrl }/hospitals`
    return this.http.post<any>(url, { name }, this.headers);
  }

  updateHospital(_id: string, name: string) {
    const url = `${ environment.baseUrl }/hospitals/${ _id }`
    return this.http.put<any>(url, { name }, this.headers);
  }

  deleteHospital(_id: string) {
    const url = `${ environment.baseUrl }/hospitals/${ _id }`
    return this.http.delete<any>(url, this.headers);
  }
}
