import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE_FACTORY } from '@angular/material/core';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  rolelist = [ "Inter","Part-Time","Full-Time" ];

  employeeForm !: FormGroup;
  actionButton : string = 'Save'
  constructor( 
      private  formBuilder : FormBuilder,
      private api : ApiService, 
      @Inject(MAT_DIALOG_DATA) public editData :any,
      private dialogRef : MatDialogRef<DialogComponent>,
      ) { }

  ngOnInit(): void {
    this.employeeForm =this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      price : ['', Validators.required],
      officename   : ['', Validators.required]
        // firstName : ['', Validators.required],
      // lastName : ['', Validators.required],
      // position : ['', Validators.required],
      // employeeId : ['', Validators.required],
      // employeeDob : ['', Validators.required],
      // catergories : ['', Validators.required],
      // salary : ['', Validators.required],
      // role : ['', Validators.required]
    });
    if(this.editData){
      this.actionButton = "Update"
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['position'].setValue(this.editData.position);
      this.employeeForm.controls['price'].setValue(this.editData.price);
      this.employeeForm.controls['officename'].setValue(this.editData.officename);

    }
    console.log(this.editData)

  };
 
  addProduct(){
    // console.log(this.employeeForm.value);
   
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(responce)=>{
            alert('One record added successfully');
            this.employeeForm.reset();
            this.dialogRef.close('save');
          }, 
          error:() => {
            alert('Error while adding')
          }
        })
      }
    }else{
      this.updateEmployee()
    }
    }
    updateEmployee(){
      this.api.putEmployee(this.employeeForm.value,this.editData._id)
      .subscribe({
        next:(responce) =>{
          this.employeeForm.reset(),
          this.dialogRef.close('update');
        },
        error:()=>{
          alert('Error while updating')
        }
      })
    }
}

  
