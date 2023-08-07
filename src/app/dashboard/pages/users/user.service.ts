import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable,  map, mergeMap,  take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';


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
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users',{
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

const token = generateRandomString(20);

    this.httpClient.post<User>( environment.baseApiUrl + '/users', {...payload, token  })
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
    this.httpClient.put( environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next:()=>this.loadUsers()
    })
  }

  deleteUserById(id: number):void{
    this.httpClient.delete( environment.baseApiUrl + '/users/' + id)
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