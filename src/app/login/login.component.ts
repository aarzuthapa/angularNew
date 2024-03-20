import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginDetail: FormGroup = new FormGroup<any>({});
 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginDetail = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(details:any){
    if(this.loginDetail.valid){
      localStorage.setItem('username', details.username);
      localStorage.setItem('password', details.password);
      this.router.navigate(['home/dashboard']);
    } else {
      this.loginDetail.markAllAsTouched();
    } 
  }
}
