import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  constructor(
    private router: Router
  ){}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  menus: Array<any> = [
    {
      title: 'Dashboard',
      url: 'home/dashboard',
    },
    {
      title: 'Details',
      url: 'home/details',
    },
    {
      title: 'User List',
      url: 'home/userList',
    },
  ]

  onLogOut() {
    // localStorage.removeItem('userDetails'); 
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }
}
