import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from '../components/clientes/cliente';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, { headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlEndpoint}/${id}`).pipe(
      tap(response => {
        let clientes = response as Cliente[];
        clientes.forEach( cliente => {
          console.log(cliente.nombre)
        })
      }),
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toString()[0].toUpperCase() + cliente.nombre.toString().slice(1);
          cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');
          return cliente;
        });
      }),
      catchError(e => {
        this.router.navigate(['clientes']);
        swal("Error al editar", e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, { headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );;
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );;
  }
}
