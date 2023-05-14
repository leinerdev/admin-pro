import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public isLoading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalService: ImageModalService,
    private searchService: SearchService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getHospitals();
    this.imgSubs = this.modalService.newImagenNotification.pipe(
      delay(1000)
    ).subscribe(() => this.getHospitals())
  }

  search(term: string) {
    if (term.length === 0) {
      return this.getHospitals();
    }

    this.searchService.search('hospitals', term).subscribe({
      next: (response) => this.hospitals = response
    })
  }

  getHospitals() {
    this.isLoading = true;
    this.hospitalService.getHospitals().subscribe({
      next: (hospitals) => {
        this.hospitals = hospitals;
        this.isLoading = false;
      }
    });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id!, hospital.name).subscribe({
      next: (res => {
        Swal.fire({
          title: 'Guardado',
          text: hospital.name,
          icon: 'success'
        })
      })
    })
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id!).subscribe({
      next: (res => {
        this.getHospitals();
        Swal.fire({
          title: 'Eliminado',
          text: hospital.name,
          icon: 'success'
        })
      })
    })
  }

  async openModelToCreateHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear nuevo hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true
    })


    if (value!.trim().length > 0) {
      this.hospitalService.createHospital(value!).subscribe({
        next: ((res: any) => {
          this.hospitals.push(res.hospital)
        })
      })
    }
  }

  openModal(hospital: Hospital) {
    this.modalService.openModal('hospitals', hospital._id!, hospital.img!)
  }

}
