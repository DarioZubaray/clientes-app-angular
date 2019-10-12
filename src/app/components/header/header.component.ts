import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.navbar {padding: .5rem 1rem 0;}']
})
export class HeaderComponent implements OnInit {

  faDragon = faDragon;
  titulo: string = 'AngularSpring';
  isAuthenticated: boolean;
  username: string;

  constructor(private _authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this._authService.isAuthenticated();
    this.username = this._authService.usuario.username;
  }

  logout(): void {
    const nombreUsuario = this._authService.usuario.username;
    this._authService.logout();
    swal('Cerrar sesión', `¡Adios ${nombreUsuario}, has cerrado sesión con éxito!`, 'info');
    this.router.navigate(['/login']);
  }

}
