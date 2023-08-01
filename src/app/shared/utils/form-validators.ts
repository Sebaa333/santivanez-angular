import { AbstractControl, FormControl,ValidatorFn,ValidationErrors } from '@angular/forms'



export function noHomeroValidator(): ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null =>{

      if(control instanceof FormControl){
        if(control.value?.toLowerCase().includes('homero')){

          return{
            noHomero:  true,
          }
        }
      }


      return null 
    }
  }