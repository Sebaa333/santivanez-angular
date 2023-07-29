import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[]=[
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
  ];

  constructor(  ) { }

  getUsers():User[]{
    return this.users;

  }

  createUser(user: User):void{
    this.users = [
      ...this.users,
      user,
    ]

  }



}
