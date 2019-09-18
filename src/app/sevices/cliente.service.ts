import { Injectable } from '@angular/core';
import { Cliente } from '../components/clientes/cliente';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
