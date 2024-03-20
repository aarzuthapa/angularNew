import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './user/details/details.component';
import { FamilyDetailsComponent } from './user/family-details/family-details.component';
import { LoginComponent } from './login/login.component';
import { negateAuthGuard } from './guards/negate-auth.guard';
import { authGuard } from './guards/auth.guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { EditListComponent } from './user/edit-list/edit-list.component';

const routes: Routes = [

  {
    path: '', redirectTo:'login', pathMatch:'full'
  },
  {
    path:'login',component: LoginComponent, 
    canActivate: [negateAuthGuard]
  },
  {path: 'home', 
  canActivate: [authGuard],
  component: BaseComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'details',
      component: DetailsComponent
    },
    {
      path: 'userList',
      component: UserListComponent
    },
    {
      path: 'editUser/:id',
      component: EditListComponent
    },
  ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
