import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

const USER_DB: Observable<User[]> = of([
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
]).pipe(delay(1000))


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subjetUsers$ = new Subject<User[]>();

  private sendNotification$ = new Subject<string>();

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();



  constructor(  ) { 
    this.sendNotification$.subscribe({})
  }

  sendNotification(notification: string): void{
    this.sendNotification$.next(notification)
  }

  loadUsers(): void{
    USER_DB.subscribe({
      next: (usuariosFromDb) =>this._users$.next(usuariosFromDb)
    })
  }

  getUsers():Observable<User[]>{
    return this.users$
  }

  createUser(user: CreateUserData):void{
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([...arrayActual, {...user,id: arrayActual.length + 1}])
      }
    })
  }

  updateUserById(id: number,usuarioActualizado: UpdateUserData): void{
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._users$.next(
          arrayActual.map((u)=> 
          u.id === id?{...u, ...usuarioActualizado}: u
          )
        )

      }
    })
  }


  deleteUserById(id: number):void{
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual)=> {
        this._users$.next(arrayActual.filter((u)=> u.id !== id))}
    })
  }



}
