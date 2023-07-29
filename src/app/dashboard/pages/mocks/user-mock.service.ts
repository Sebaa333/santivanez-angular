import { User } from "../users/models";

export class UserMockService{
    private users: User[]=[
        {
        id:1, 
        name:'FAKE_NAME',
        surname:'FAKE_SURNAME',
        email:'FAKE@mail.com',
        password:'123456'
        }, 
      ];
    getUsers():User[]{
        return this.users;
    
    }
}