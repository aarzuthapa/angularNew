import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent {

  familyDetails: FormGroup = new FormGroup <any> ({});
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.familyDetails = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      age: ['', Validators.required],
    })
  }
}
