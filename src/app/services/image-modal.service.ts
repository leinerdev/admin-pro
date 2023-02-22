import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  private _hideModal: boolean = true;
  public type!: 'users' | 'doctors' | 'hospitals';
  public id: string = '';
  public img: string = 'no-image';

  public newImagenNotification: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: 'users' | 'doctors' | 'hospitals', id: string, img: string) {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${ base_url }/upload/${ type }/${ img }`
    }

    // this.img = img;
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() { }
}
