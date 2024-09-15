import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-lobby',
    loadComponent:()=> import('./user-lobby/user-lobby.component').then(res=>res.UserLobbyComponent)},  
  { path: '', redirectTo: '/user-lobby', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
