import { Component, OnInit } from '@angular/core';
import { Course} from './models'
import { CourseService } from './course.service';
import {  Observable, take }from 'rxjs'
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent  implements OnInit{
  public displayedColumns = ['id', 'name','price','action'];
  public data$: Observable<Course[]>
  public isAdmin$:Observable<boolean>

  constructor(private courseService: CourseService,private store:Store){
    this.data$ =this.courseService.getCourses()
    this.isAdmin$ =this.store.select(selectIsAdmin)
  }




 ngOnInit(): void {
   this.courseService.loadCourses();
 }


onCreate():void{
  this.courseService.create()
}


onDelete(id:number):void{
  this.courseService.deleteById(id)
}


}
