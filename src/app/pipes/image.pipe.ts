import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type: 'users' | 'doctors' | 'hospitals'): string {
    if (!image) {
      return `${ baseUrl }/upload/users/no-image`;
    }

    if (image.includes('https')) {
      return image;
    }

    if (image) {
      return `${ baseUrl }/upload/${ type }/${ image }`
    } else {
      return `${ baseUrl }/upload/${ type }/no-image`
    }
  }

}
