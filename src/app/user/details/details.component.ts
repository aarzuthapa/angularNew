import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  details: FormGroup = new FormGroup<any>({});
  deleteButton: boolean = false;
  // private currentId = 1; 

  constructor(
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.details = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      age: ['', Validators.required],
      familyDetails: this.formBuilder.array([
        this.familyList(),
      ]),
    });
  }

  familyList(): FormGroup {
    return this.formBuilder.group({ 
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  get familyDetails(): FormArray {
    return this.details.get('familyDetails') as FormArray;
  }

  addfamilyDetails() {
    this.familyDetails.push(this.familyList());
  }

  onSave(): void {
    if (this.familyDetails.valid) {
      let allUserDetails: any = new Array<any>();

      const existingDetails = localStorage.getItem('userDetails');
      if (existingDetails) {
        allUserDetails = JSON.parse(existingDetails);
      }

      let usersDetailLength = Object.keys(allUserDetails).length + 1;

      this.details.value.id = usersDetailLength;

      this.details.value?.familyDetails?.map((family: any, familyIndex: number) => {
        family['id'] = familyIndex + 1;
        return family;
      });

      allUserDetails.push(this.details.value);

      localStorage.setItem('userDetails', JSON.stringify(allUserDetails));
    }
    // alert("Save successfully!!");
    this.details.reset();
    }

 

  onDeleteButtonClick(i: number) {
    if (this.familyDetails.length > 0) {
      this.familyDetails.removeAt(i);
    } else {
      this.deleteButton = false;
    }
  }

  onCancel() {
    this.location.back();
  }
}