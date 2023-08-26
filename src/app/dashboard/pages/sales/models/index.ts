import { Buyer } from '../../buyers/models';
import { Course } from '../../courses/models';

export interface Sale {
  id: number;
  coursesId: number;
  buyerId: number;
}

export interface SaleWithCourseAndBuyer extends Sale {
  courses: Course;
  buyer: Buyer;
}

export interface CreateSalePayload {
  coursesId: number | null;
  buyerId: number | null;
}