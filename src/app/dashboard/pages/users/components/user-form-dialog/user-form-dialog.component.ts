import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, AbstractControl, ValidationErrors,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { noHomeroValidator } from 'src/app/shared/utils/form-validators'
@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
  nameControl = new FormControl(null,
    [ Validators.required,
      Validators.minLength(2),
      noHomeroValidator(),
  
    ]);
    surnameControl =new FormControl(null,[Validators.required]);
    emailControl = new FormControl(null,[Validators.required]);
    passwordControl = new FormControl(null,[Validators.required]);
  
    userForm= new FormGroup({
      name: this.nameControl,
      surname: this.surnameControl,
      email: this.emailControl,
      password: this.passwordControl,
  
    })
  
    // validacion custom
  
    noHomeroValidator(): ValidatorFn{
      // abstrarc control es un formarray,control o group
      return(control: AbstractControl): ValidationErrors | null =>{
  
        if(control instanceof FormControl){
          if(control.value?.toLowerCase().includes('homero')){
  
            return{
              noHomero:  true,
            }
          }
        }
  
  
        return null // NULL SERIA SI ES CASO EL VALIDO COMO DECIR QUE NO HAY ERROR
      }
    }

    constructor(private dialogRef: MatDialogRef<UserFormDialogComponent>){}
  
  
  
    onSubmit(): void{
      if(this.userForm.invalid){
        this.userForm.markAllAsTouched
      }else{
        this.dialogRef.close(this.userForm.value);

      }
    }
}
