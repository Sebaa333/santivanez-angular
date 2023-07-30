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
  public users: Observable <User[]>;

  public semaforoSubscription?:Subscription

  public allSubs: Subscription []= []

  public destroyed = new Subject<Boolean>()

  public loading = false
  public nombres:  string[] = []
  public numeros: number[] = []


  constructor(

    private matDialog: MatDialog,
    private usersService: UserService,
    private notifier: NotifierService,



    @Inject('IS_DEV') private isDev: boolean
    ){
      this.users = this.usersService.getUsers().pipe(
        // PRIMERO ESTO
        tap((valorOriginal)=> console.log('VALOR ANTES DEL MAP',valorOriginal)),
        // LUEGO  ESTO
        map((valorOriginal) => 
        valorOriginal.map((usuario)=>({ 
          ...usuario, 
          name: usuario.name.toUpperCase(), 
          surname: usuario.surname.toLocaleUpperCase(),
        }))
        ),
        // Y POR ULTIMO  ESTO
        tap((valorMapeado)=> console.log('VALOR DESPUES DEL MAP',valorMapeado)),
      );

      // operador map y filter
      // of(1, 2, 3, 4, 5)
      // .pipe(
      //   map((v)=> v*2),
      //   filter((valorMapeado)=> valorMapeado < 6)
      // )
      // .subscribe({
      //   next: (v)=>{
      //     console.log(v)
      //   }
      // })

      const obs1$ = of(['Maria' ,'Juan','Santiago']).pipe(delay(3000))
      const obs2$ = of([1, 2, 3, 4, 5,]).pipe(delay(6000))

      
        this.loading = true
        // no funciona bien
      // obs1$.subscribe({
      //   next:(v) => (this.nombres = v),
      //   complete:() => (this.loading = false),
      // })

      // obs2$.subscribe({
      //   next:(v) => (this.numeros = v),
      //   complete:() => (this.loading = false),
      // });

      forkJoin([
        obs1$,
        obs2$
      ]).subscribe({

        next: ([nombres, numeros])=>{
          this.nombres = nombres
          this.numeros = numeros
          
        },
        complete: ()=> (this.loading = false),
        }
      )




      
      
      // 1 cargo los usuarios
      usersService.loadUsers()
      // 2 los obtengo
      // this.usersService.getUsers().subscribe({
      //   next: (users)=>{
      //     // console.log(v)
      //     this.users = users;
      //     // this.usersService.sendNotification('se cargaron los usuarios')
          
      //   }
      // })
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
      // semaforo.pipe(takeUntil(this.destroyed),
      // map((color)=> color.toUpperCase()))
      // .subscribe({
      //   // cuando el observable emite
      //   next: (color) => {console.log(color)},
      //   // cuando el observable emite un error
      //   error: () => {},
      //   // cuando el observable termina
      //   complete: () => {console.log('se completo') },
        
      // })
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
            this.notifier.showSuccess('Se cargaron los usuarios correctamente')
            this.usersService.createUser(
              {
                    id:new Date().getTime(),
                    name: v.name,
                    email: v.email,
                    password: v.password,
                    surname: v.surname
                  }
            )
            // console.log('RECIBIMOS EL VALOR ', v);
          }else{
            this.notifier.showCancel('Se cancelo la subscripcion')

            // console.log('SE CANCELO', v)
          }
        }
      })

} 

onDeleteUser(userToDelete:User):void{
  if(confirm(`¿Estas seguro de eliminar a ${userToDelete.name}?`)){
    // this.users = this.users.filter((u)=> u.id !== userToDelete.id)
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
            // this.users = this.users.map((user)=>{

            //   return user.id === userToEdit.id
            //   ?{...user, ...userUpdated }
            //   : user
            //   ;
            // }) 
          }
        }
      })
  }
}