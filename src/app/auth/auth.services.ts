import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.action";

@Injectable({ providedIn: 'root' })

export class AuthService{
    constructor(
        private notifier: NotifierService,
        private httpClient:HttpClient,
        private store: Store,
        private router: Router,
        ){}
        
    isAuthenticated():Observable< boolean >{
        return this.httpClient.get<User[]>(environment.baseApiUrl + '/users',{
            params:{
                token: localStorage.getItem('token')|| '',
            }
        }).pipe(
            map((usersResult) =>{
                if(usersResult.length){
                    const authUser = usersResult[0]
                    this.store.dispatch(AuthActions.setAuthUser({payload :authUser}))

                }
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
                    this.store.dispatch(AuthActions.setAuthUser({payload :authUser}))
                    this.router.navigate(['/dashboard'])
                    localStorage.setItem('token', authUser.token)
                }else{
                    this.notifier.showCancel('Email o Contraseña invalida')
                    this.store.dispatch(AuthActions.setAuthUser({payload :null}))
                }
            },
            error:(err) =>{
                if(err instanceof HttpErrorResponse){
                    let message = 'Ocurrio un error Inesperado'
                    if(err.status ===500){
                    }
                    if(err.status ===401){
                        message ='Email o Contraseña invalida';
                    }
                    this.notifier.showCancel(message)
                }
            }
        })
    }
    public logout():void{
        this.store.dispatch(AuthActions.setAuthUser({payload:null}))
    }
}