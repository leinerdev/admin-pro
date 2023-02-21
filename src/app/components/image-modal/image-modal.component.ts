import { Component, OnInit } from '@angular/core';
import { ImageModalService } from 'src/app/services/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  constructor(public modalService: ImageModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
