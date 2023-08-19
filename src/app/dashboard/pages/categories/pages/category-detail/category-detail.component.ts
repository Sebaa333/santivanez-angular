import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../courses/course.service';
import { Course } from '../../../courses/models';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store/categories.actions';
import { Observable } from 'rxjs';
import { selectCategoryDetailName } from '../../store/categories.selectors';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styles: [
  ]
})
export class CategoryDetailComponent implements OnInit {

  displayedColumns =['id', 'name', 'price']
  courses:Course[]=[]
  categoryName$:Observable<string | undefined>;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private courseService:CourseService,
    private store: Store,
     ){
    this.categoryName$ =this.store.select(selectCategoryDetailName)
  }
  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategoryDetail({categoryId:this.ActivatedRoute.snapshot.params['id']}))

    this.courseService.getCoursesByCategoryId(this.ActivatedRoute.snapshot.params['id']).subscribe({
      next:(courses)=>(this.courses=courses)
    })
  }

}
