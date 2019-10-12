import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { Region } from '../models/region';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint = 'http://localhost:8080/api/clientes';

  constructor(public http: HttpClient,
              public router: Router) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndpoint + '/regiones');
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre)
        })
      }),
      map((response: any) => {
        let clientes = response.content as Cliente[];
        clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toString()[0].toUpperCase() + cliente.nombre.toString().slice(1);
          cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');
          return cliente;
        });
        return response;
      }),
      catchError(e => {
        this.router.navigate(['clientes']);
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente)
    );
  }

  getCliente(id: number): Observable<any> {
    console.log("getCliente: " + id);
    return this.http.get(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndpoint}/${id}`);
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData,
     { reportProgress: true}
    );

    return this.http.request(req);
  }

}
