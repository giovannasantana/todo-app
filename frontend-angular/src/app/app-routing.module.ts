import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirecionar para a página de register por padrão
  { path: '**', redirectTo: '/register' } // Redirecionar qualquer rota desconhecida para register
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
