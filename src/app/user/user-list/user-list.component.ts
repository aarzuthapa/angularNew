import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  submittedUser: any []=[];

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    const existingDetails = localStorage.getItem('userDetails');
    if (existingDetails) {
      this.submittedUser = JSON.parse(existingDetails);
    }
  }

  onAddClick(){
    this.router.navigate(['/home/details'])
  }

  onEditClick(id: number){
    this.router.navigate(['/home/editUser/',id]);
    console.log(id);
  }

  onDeleteClick(id: number){

  }
}
