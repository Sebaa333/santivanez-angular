import { Pipe, PipeTransform } from '@angular/core';
const errorByKey ={
  required: 'stringidsa',
  email: 1
}

@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: {key:string,value:any}, ...args: unknown[]): unknown {

    
    console.log(error)
    const errorMessages: Record< string, string> = {
      required: 'Este campo es requerido',
      email: 'Debe ser un email valido',
      minlength: 'El largo no cumple con lo requerido'
    };

    
    // console.log(error)
    return errorMessages[error.key] || 'Campo invalido';
  }

}
