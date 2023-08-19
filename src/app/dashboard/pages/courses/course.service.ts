import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs'
import { Course} from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses$ = new BehaviorSubject<Course[]>([]);

  constructor(private http: HttpClient) { }

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
        categoryId:1
      },
      {
        id:2,
        name: 'React',
        descripcion:'Curso de coder',
        price: 1500,
        categoryId:1
      },
      {
        id:3,
        name: 'Vue',
        descripcion:'Curso de coder',
        price: 2000,
          categoryId:1
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
          price:5400,
          categoryId:1
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
getCoursesByCategoryId(categoryId:number):Observable<Course[]>{
  return this.http.get<Course[]>(environment.baseApiUrl + `/courses?categoryId=${categoryId} `)
}

}
