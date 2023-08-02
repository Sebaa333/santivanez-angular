import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, Subject, Subscription, delay, filter, forkJoin, map, of, takeUntil, tap } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnDestroy {
  public users: Observable<User[]>;
  public destroyed = new Subject<Boolean>()
  public loading = false
  

  constructor(

    private matDialog: MatDialog,
    private usersService: UserService,
    private notifier: NotifierService,

    @Inject('IS_DEV') private isDev: boolean
    ){
      this.usersService.loadUsers();
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
            // this.notifier.showSuccess('Se cargaron los usuarios correctamente')
            this.usersService.createUser({
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname
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
      // abro el modal 
      .open(UserFormDialogComponent,{
        data: userToEdit
      })
      // y cuando cierra
      .afterClosed()
      // HAGA ESTO
      .subscribe({
        next: (userUpdated) =>{
          if(userUpdated){
            this.usersService.updateUserById(userToEdit.id, userUpdated)
          }
        }
      })
  }
}