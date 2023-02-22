import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  public uploadImage!: File;
  public imgTemp: any = null;

  constructor(
    public modalService: ImageModalService,
    protected fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalService.closeModal();
  }

  changeImage(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage = file;

    if (!file) {
      this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  onUploadImage() {
    const id = this.modalService.id;
    const type = this.modalService.type;

    this.fileUploadService.updateImage(this.uploadImage, type, id).then(img => {
      this.closeModal();
      this.modalService.newImagenNotification.emit(img);
      Swal.fire('Guardado', 'La imagen ha sido actualizada', 'success');
    })
  }

}
