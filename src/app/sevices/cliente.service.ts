import { Injectable } from '@angular/core';
import { Cliente } from '../components/clientes/cliente';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    const url = this.urlEndpoint + '/clientes';
    return this.http.get<Cliente[]>(url);
    // return of(CLIENTES);
  }
}
