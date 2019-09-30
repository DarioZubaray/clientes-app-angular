import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  constructor() { }

  abrirModal() {
    console.log('ModalService - abrirModal')
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }
}
