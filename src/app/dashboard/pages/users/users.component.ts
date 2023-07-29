import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  public users: User []= [];

  public semaforoSubscription?:Subscription
  public allSubs: Subscription []= []

  public destroyed = new Subject<Boolean>()


  constructor(
    private matDialog: MatDialog,
    private usersService: UserService,
    @Inject('IS_DEV') private isDev: boolean
    ){
      this.users= this.usersService.getUsers()
      // console.log(this.isDev)
    
    // ASINCRONIA REPASO
    const meDevuleveElDinero = new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(true)
        // reject('DINERO NO DEVUELTO');
      }, 2000);
    })

    meDevuleveElDinero
    // cuando se cumple observable (next)
    // .then((value)=>console.log(value))
    // cuando se falla  observable(error)
    .catch((error)=>alert(error))
    // cuando se termina el proceso si se cumplio o no observable (complete)
    .finally(()=>{}) 
    
    const semaforo = new Observable<string>((subscriber)=>{
      let color = 'verde';
      setInterval(()=>{
        //  color === 'verde'?  subscriber.next('rojo'):subscriber.next('rojo')
        if(color === 'verde'){
          subscriber.next('rojo')
          color = 'rojo'
        }else{
          subscriber.next('verde')
          color = 'verde'
          // subscriber.complete()
        }
      }, 1000);
    });
    
    // this.allSubs.push(

    //   )
      semaforo.pipe(takeUntil(this.destroyed),
      map((color)=> color.toUpperCase()))
      .subscribe({
        // cuando el observable emite
        next: (color) => {console.log(color)},
        // cuando el observable emite un error
        error: () => {},
        // cuando el observable termina
        complete: () => {console.log('se completo') },
        
      })
    // fetch('https://reqres.in/api/users?page=2')
    // .then((respuestaDelServidor)=> respuestaDelServidor.json())
    // .then((data)=> console.log(data))
    }




    ngOnDestroy(): void {
      console.log('Se Destruyo')
      // this.semaforoSubscription?.unsubscribe()
      // this.allSubs.forEach((s) => s.unsubscribe())
      this.destroyed.next(true)
    }

  
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
            // this.users = [
            //   ...this.users,
            // {
            //     id:this.users.length + 1,
            //     name: v.name,
            //     email: v.email,
            //     password: v.password,
            //     surname: v.surname
            //   }
            // ]

            this.usersService.createUser(
              {
                    id:this.users.length + 1,
                    name: v.name,
                    email: v.email,
                    password: v.password,
                    surname: v.surname
                  }
            )
            console.log('RECIBIMOS EL VALOR ', v);
          }else{
            console.log('SE CANCELO')
          }
        }
      })

} 

onDeleteUser(userToDelete:User):void{
  if(confirm(`¿Estas seguro de eliminar a ${userToDelete.name}?`)){
    this.users = this.users.filter((u)=> u.id !== userToDelete.id)
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
          console.log(userUpdated)
          if(userUpdated){
            this.users = this.users.map((user)=>{

              return user.id === userToEdit.id
              ?{...user, ...userUpdated }
              : user
              ;
            }) 
          }
        }
      })
  }
}
