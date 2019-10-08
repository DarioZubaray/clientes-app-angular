import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor inicia sesión";
  usuario: Usuario;
  faKey = faKey;

  constructor(private _authService: AuthService, public router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', '¡Usuario o contraseña vacios!', 'error');
      return;
    }
    this._authService.login(this.usuario).subscribe(response => {
      const accessToken = response.access_token;

      this._authService.guardarUsuario(accessToken);
      this._authService.guardarToken(accessToken);

      this.router.navigate(['/clientes']);
      swal('¡Sesión iniciada!', `Hola ${this._authService.usuario.username} ¿Cómo estas hoy?`, 'success');
    });
  }
}
