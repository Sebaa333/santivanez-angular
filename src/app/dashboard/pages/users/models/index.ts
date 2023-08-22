export interface User{
    id:number
    name:string
    surname:string
    email:string
    password:string
    token:string
    role: 'ADMINISTRADOR'| 'USUARIO'
}

export interface CreateUserData{
    name:string
    surname:string
    email:string
    role: string,
    password:string

}


export interface RegisterUserData{
    name:string
    surname:string
    email:string
    password:string
}

export interface UpdateUserData{
    name?:string
    surname?:string
    email?:string
    role?: string,
    password?:string
    token?: string
}