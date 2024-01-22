import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './services/guards/authentication.guard';
const routes: Routes = [ 
  {
    path: 'login',
    component: LoginComponent
  },
{path:'', component: NavigationComponent,canActivate: [AuthenticationGuard],
  children:[
    {
    path:'',
    component: UsersComponent
    },
    {
      path:'user/:id',
      component: UserDetailComponent
    }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
