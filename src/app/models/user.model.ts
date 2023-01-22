import { environment } from "src/environments/environment";
const baseUrl = environment.baseUrl
export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public _id?: string,
    public google?: boolean,
    public role?: string,
  ) {

  }

  get imageUrl() {
    if (this.img?.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${ baseUrl }/upload/users/${ this.img }`
    } else {
      return `${ baseUrl }/upload/users/no-image`
    }
  }
}
