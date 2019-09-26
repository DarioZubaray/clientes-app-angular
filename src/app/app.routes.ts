import { ClientesComponent } from "./components/clientes/clientes.component";
import { DirectivaComponent } from "./components/directiva/directiva.component";
import { FormComponent } from "./components/clientes/form.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent },
  {path: 'directiva', component: DirectivaComponent },
  {path: 'clientes/forma', component: FormComponent },
  {path: 'clientes/forma/:id', component: FormComponent }
]

export const APP_ROUTES = RouterModule.forRoot(routes);