import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';


const ELEMENT_DATA: User[] = [
  {
  id:1, 
  name:'Seba',
  surname:'santivanez',
  email:'seba@mail.com',
  password:'123456'
  },
  { 
    id:2, 
    name:'Nico',
    surname:'Rodriguez',
    email:'seba@mail.com',
    password:'123456'
  },
];



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users: User []= ELEMENT_DATA;
  constructor(
    private matDialog: MatDialog
  ){}
  
    onCreateUser():void{
      this.matDialog
      // abro el modal 
      .open(UserFormDialogComponent)
      // y cuando cierra
      .afterClosed()
      // HAGA ESTO
      .subscribe({
        next: (v) =>{
          if(v){
            // this.users.push({
            //   id:this.users.length + 1,
            //   name: v.name,
            //   email: v.email,
            //   password: v.password,
            //   surname: v.surname
            // });
            this.users = [
              ...this.users,{
                id:this.users.length + 1,
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname

              }
            ]
            console.log('RECIBIMOS EL VALOR ', v);
          }else{
            console.log('SE CANCELO')
          }
        }
      })

} 
}
