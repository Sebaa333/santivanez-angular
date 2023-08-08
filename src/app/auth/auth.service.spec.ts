import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.services"
import { User } from "../dashboard/pages/users/models"
import { Router } from "@angular/router"
import {MockProvider} from 'ng-mocks';

describe('AuthService',()=>{


    let service:AuthService
    let httpController :HttpTestingController 
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule,RouterTestingModule,],
            providers:[
                // {
                //     provide:Router,
                //     useClass:RouterMock
                // }
                MockProvider(Router)
            ]
            
        })

        service = TestBed.inject(AuthService)
        httpController =TestBed.inject(HttpTestingController);
    })

    afterEach(()=>{
        httpController.verify()

    })


    it('Si el login es valido el observable authuser$ debe emitir un valor',(done)=>{
        const mockUser :User ={
            id:1,
            email:'fake@mail.com',
            password:'123456',
            name:'Fake',
            surname: 'User',
            token:'skj3kjsdiamsdasj',
        }
        const mockResponse: User[]=[mockUser]
        service.login({
            email: mockUser.email,
            password:mockUser.password
        });
        httpController.expectOne({
            method:'GET',
            url:`http://localhost:3000/users?email=${mockUser.email}&password=${mockUser.password}`
        }).flush(mockResponse)
        service.authUser$.subscribe({
            next:(authUser)=>{
                expect(authUser).toBeTruthy()
                expect(authUser).toEqual(mockUser)
                done()
            }
        })

    })
})