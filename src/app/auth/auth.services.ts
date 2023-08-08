import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })

export class AuthService{

    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();

    constructor(
        private notifier: NotifierService,
        private httpClient:HttpClient,
        private router: Router,){}

    isAuthenticated():Observable< boolean >{
        // return this.authUser$.pipe(
        //     take(1),
        //     map((user) => !!user ));

        return this.httpClient.get<User[]>(environment.baseApiUrl + '/users',{
            params:{
                token: localStorage.getItem('token')|| '',
            }
        }).pipe(
            map((usersResult) =>{
                return !!usersResult.length
            })
        )
    }

    login(payload: LoginPayload): void{
        this.httpClient.get<User[]>( environment.baseApiUrl + '/users',{
            params:{
                email:payload.email || '',
                password: payload.password || ''
            }
        }).subscribe({
            next:(response) => {
                if(response.length){
                    const authUser = response[0]
                    this._authUser$.next(authUser);
                    this.router.navigate(['/dashboard'])
                    localStorage.setItem('token', authUser.token)
                }else{
                    this.notifier.showCancel('Email o Contraseña invalida')
                    this._authUser$.next(null);
                }
            },
            error:(err) =>{
                if(err instanceof HttpErrorResponse){
                    let message = 'Ocurrio un error Inesperado'
                    if(err.status ===500){
                    }
                    if(err.status ===401){
                        // this.notifier.showCancel('Email o Contraseña invalida')
                        message ='Email o Contraseña invalida';
                    }
                    this.notifier.showCancel(message)
                }
            }
        })
    }
}