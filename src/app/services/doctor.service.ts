import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

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

  getDoctors() {
    const url = `${ environment.baseUrl }/doctors`
    return this.http.get<any>(url, this.headers).pipe(
      map((res: { ok: boolean, doctors: Doctor[] }) => res.doctors)
    )
  }

  createDoctor(doctor: Doctor) {
    const url = `${ environment.baseUrl }/doctors`
    return this.http.post<any>(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${ environment.baseUrl }/doctors/${ doctor._id }`
    return this.http.put<any>(url, doctor, this.headers);
  }

  deleteDoctor(_id: string) {
    const url = `${ environment.baseUrl }/doctors/${ _id }`
    return this.http.delete<any>(url, this.headers);
  }
}
