import { Routes, RouterModule } from "@angular/router";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { DirectivaComponent } from "./components/directiva/directiva.component";
import { FormComponent } from "./components/clientes/form.component";
import { LoginComponent } from "./components/usuarios/login.component";
import { PerfilComponent } from "./components/usuarios/perfil.component";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent },
  {path: 'clientes/page/:page', component: ClientesComponent },
  {path: 'directiva', component: DirectivaComponent },
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  {path: 'clientes/forma', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'clientes/forma/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'login', component: LoginComponent }
]

export const APP_ROUTES = RouterModule.forRoot(routes);
