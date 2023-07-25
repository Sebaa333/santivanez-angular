import { AbstractControl, FormControl,ValidatorFn,ValidationErrors } from '@angular/forms'



export function noHomeroValidator(): ValidatorFn{
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