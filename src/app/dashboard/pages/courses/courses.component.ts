import { Component, OnInit } from '@angular/core';
import { Course} from './models'
import { CourseService } from './course.service';
import {  Observable, take }from 'rxjs'
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent  implements OnInit{
  // public dataSource: Course[] = [];
  public displayedColumns = ['id', 'name','price','action'];

  public data$: Observable<Course[]>

  constructor(private courseService: CourseService){
    this.data$ =this.courseService.getCourses()
  }




 ngOnInit(): void {
   this.courseService.loadCourses();

  //  this.courseService.getCourses().subscribe({
  //   next: (data) => console.log('data:', data)
  //  })
 }


onCreate():void{
  this.courseService.create()
}


onDelete(id:number):void{
  this.courseService.deleteById(id)
}


}
