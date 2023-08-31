import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, Subject,  } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnDestroy {
  public users: Observable<User[]>;
  public isLoading$: Observable<boolean >;
  public destroyed = new Subject<Boolean>()
  public loading = false
  constructor(private matDialog: MatDialog,private usersService: UserService,){

      this.usersService.loadUsers();
      this.isLoading$ =this.usersService.isLoading$
      this.users = this.usersService.getUsers();
    };
    ngOnDestroy(): void {
      console.log('Se Destruyo')
      
      this.destroyed.next(true)
    }
    onCreateUser():void{
      this.matDialog
      .open(UserFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) =>{
          if(v){
            this.usersService.createUser({
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname,
                role: v.role
              }
            )
          }
        }
      })
} 

onDeleteUser(userToDelete: User): void {
  if (confirm(`¿Estás seguro de eliminar a ${userToDelete.name}?`)) {
    this.usersService.deleteUserById(userToDelete.id)
  }
}
  onEditUser(userToEdit:User):void{
    this.matDialog
      .open(UserFormDialogComponent,{
        data: userToEdit
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) =>{
          if(userUpdated){
            this.usersService.updateUserById(userToEdit.id, userUpdated)
          }
        }
      })
  }
}