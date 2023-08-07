import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();
  private _isLoading$ = new BehaviorSubject(false)
  public isLoading$ = this._isLoading$.asObservable()

  constructor( private notifier: NotifierService, private httpClient: HttpClient ) { }


  loadUsers(): void{
    this._isLoading$.next(true)
    this.httpClient.get<User[]>('http://localhost:3000/users',{
      headers: new HttpHeaders({
        'token':'12345678910'
      }),
      params:{
        page:1,
        limit:90,
      }
    }).subscribe({
      next: (response) =>{
        console.log('response', response)
        this._users$.next(response)
      },
      error:() =>{
        this.notifier.showCancel('error al cargar los usuarios')
      },
      complete: () =>{
        this._isLoading$.next(false)
      }
    })
  }

  getUsers():Observable<User[]>{
    return this.users$
  }

getUserById(id: number): Observable< User | undefined> {
  return this.users$.pipe(
    map(( users ) => users.find((u) => u.id === id) ),
    take(1),
    )
}

  createUser(payload: CreateUserData):void{
    this.httpClient.post<User>('http://localhost:3000/users',payload)
    .pipe(
      mergeMap((userCreated) => this.users$.pipe(
        take(1),
        map(
          (arrayActual)=>[...arrayActual, userCreated])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) =>{
        this._users$.next(arrayActualizado)
        
      }
    })
  }

  updateUserById(id: number,usuarioActualizado: UpdateUserData): void{
    this.httpClient.put('http://localhost:3000/users/' + id, usuarioActualizado).subscribe({
      next:()=>this.loadUsers()
    })
  }

  deleteUserById(id: number):void{
    this.httpClient.delete('http://localhost:3000/users/' + id)
    .pipe(
      mergeMap(
        (responseUserDelete) => this.users$.pipe(
          take(1),
          map((arrayActual) => arrayActual.filter((u)=> u.id !== id))
        )
      )
    ).subscribe({
      next:(arrayActualizado) => this._users$.next(arrayActualizado)
    })
  }
}