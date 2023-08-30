import { Buyer } from '../../buyers/models';
import { Course } from '../../courses/models';

export interface Sale {
  id: number;
  courseId: number;
  buyerId: number;
}

export interface SaleWithCourseAndBuyer extends Sale {
  course: Course;
  buyer: Buyer;
}

export interface CreateSalePayload {
  courseId: number | null;
  buyerId: number | null;
}