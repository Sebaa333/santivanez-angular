import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs'
import { Course} from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses$ = new BehaviorSubject<Course[]>([]);

  constructor() { }

  getCourses(): Observable<Course[]>{
    return this.courses$.asObservable()

  }

  loadCourses():void{
    this.courses$.next([
      {
        id:1,
        name: 'Angular',
        descripcion:'Curso de coder',
        price: 1000,
      },
      {
        id:2,
        name: 'React',
        descripcion:'Curso de coder',
        price: 1500,
      },
      {
        id:3,
        name: 'Vue',
        descripcion:'Curso de coder',
        price: 2000,
      },
    ]);
  }
  create():void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        arrayActual.push({
          id: arrayActual.length + 1,
          name: 'random name',
          descripcion: 'random Drescription',
          price:5400
        });
        this.courses$.next([...arrayActual]);
      }
    })

  }

deleteById(id:number):void{
  this.courses$.pipe(take(1)).subscribe({
    next: (arrayActual) => {
      this.courses$.next(
        arrayActual.filter((c)=> c.id !== id)
        )
    }
  })
}

}
