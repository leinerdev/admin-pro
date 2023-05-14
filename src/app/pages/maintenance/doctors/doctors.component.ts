import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = [];
  public isLoading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private doctorsService: DoctorService,
    private modalService: ImageModalService,
    private searchService: SearchService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getDoctors();
    this.imgSubs = this.modalService.newImagenNotification.pipe(
      delay(1000)
    ).subscribe(() => this.getDoctors());
  }

  getDoctors() {
    this.isLoading = true;
    this.doctorsService.getDoctors().subscribe(doctors => {
      this.isLoading = false;
      this.doctors = doctors;
    });
  }

  openModal(doctor: Doctor) {
    this.modalService.openModal('doctors', doctor._id!, doctor.img!)
  }

  search(term: string) {
    if (term.length === 0) {
      return this.getDoctors();
    }

    this.searchService.search('doctors', term).subscribe({
      next: (response) => this.doctors = response
    })
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: '¿Borrar doctor?',
      text: `Estas a punto de borrar a ${ doctor.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorsService.deleteDoctor(doctor._id!).subscribe({
          next: () => {
            this.getDoctors();
            Swal.fire({
              title: 'Doctor borrado',
              text: `El doctor ${ doctor.name } ha sido eliminado.`,
              icon: 'success'
            });
          }
        });
      }
    });
  }

}
