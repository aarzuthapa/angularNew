

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.scss'
})
export class EditListComponent implements OnInit {
  details: FormGroup = new FormGroup<any>({});

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.details = this.formBuilder.group({
      id: [''],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      age: ['', Validators.required],
      familyDetails: this.formBuilder.array([])
    });

    this.activatedRoute.params.subscribe(params => {
      const userId = +params['id'];
      const userData = this.getUserDetailsFromLocalStorage(userId);
      if (userData) {
        this.populateForm(userData);
      }
    });
  }

  getUserDetailsFromLocalStorage(userId: number): any {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const allUserDetails: any[] = JSON.parse(userDetails);
      return allUserDetails.find(user => user.id === userId);
    }
    return null;
  }

  addfamilyDetails() {
    this.familyDetails.push(this.familyList());
  }

  familyList(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  get familyDetails(): FormArray {
    return this.details.get('familyDetails') as FormArray;
  }

  populateForm(data: any): void {
    this.details.patchValue({
      id: data.id,
      fullName: data.fullName,
      address: data.address,
      contact: data.contact,
      age: data.age
    });

    if (Array.isArray(data.familyDetails)) {
      const familyDetailsArray = this.details.get('familyDetails') as FormArray;
      familyDetailsArray.clear();

      data.familyDetails.forEach((familyDetail: any) => {
        familyDetailsArray.push(
          this.formBuilder.group({
            id: familyDetail.id,
            fullName: familyDetail.fullName,
            address: familyDetail.address,
            contact: familyDetail.contact,
            age: familyDetail.age
          })
        );
      });
    }
  }

  onUpdate(): void {
    if (this.details.valid) {
      const editedUserData = this.details.value;

      const userDetails = localStorage.getItem('userDetails');

      if (userDetails) {
        const allUserDetails: any[] = JSON.parse(userDetails);
        const editedUserIndex = allUserDetails.findIndex(user => user.id === editedUserData.id);

        if (editedUserIndex !== -1) {
          allUserDetails[editedUserIndex] = editedUserData;
          allUserDetails[editedUserIndex]['age'] = `${allUserDetails[editedUserIndex]['age']} years`;

          allUserDetails[editedUserIndex]['familyDetails'] = allUserDetails[editedUserIndex]['familyDetails']?.map((family: any) => {
              return {
                  ...family,
                  age: `${family['age']} years`
              };
          });

          localStorage.setItem('userDetails', JSON.stringify(allUserDetails));

          this.router.navigate(['home/userList']);
        } else {
          console.log('User with provided ID not found in the array.');
        }
      }
    }
    this.details.reset();
  }


  

  onCancel(){
    this.location.back();
  }

  onDeleteButtonClick(i: number){

  }
}
 
  

