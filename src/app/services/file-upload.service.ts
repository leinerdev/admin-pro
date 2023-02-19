import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateImage(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ): Promise<any> {
    try {
      const url = `${ baseUrl }/upload/${ type }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', file);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await res.json();
      console.log(data.msg);
      if (data.ok) {
        return data.fileName
      } else {
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
