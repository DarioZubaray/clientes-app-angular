import { Routes, RouterModule } from "@angular/router";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { DirectivaComponent } from "./components/directiva/directiva.component";
import { FormComponent } from "./components/clientes/form.component";
import { DetalleComponent } from "./components/detalle/detalle.component";

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent },
  {path: 'clientes/page/:page', component: ClientesComponent },
  {path: 'directiva', component: DirectivaComponent },
  {path: 'clientes/forma', component: FormComponent },
  {path: 'clientes/forma/:id', component: FormComponent },
  {path: 'clientes/detalle/:id', component: DetalleComponent }
]

export const APP_ROUTES = RouterModule.forRoot(routes);
