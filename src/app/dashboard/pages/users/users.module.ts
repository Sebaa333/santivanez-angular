import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserService } from './user.service';
import { UserMockService } from '../mocks/user-mock.service';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserFormDialogComponent,
    UsersTableComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UsersRoutingModule,
  ],
  exports:[
    UsersComponent
  ],
  providers:[
  {
    provide: 'IS_DEV',
    useValue: false,
  },
  
]
})
export class UsersModule { }
