import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent {
  public userId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private notification: NotifierService,
    private userService: UserService,
    ){
      if(!Number(this.activatedRoute.snapshot.params['id'])){
        this.router.navigate(['dashboard','users']);
        this.notification.showCancel(`${this.activatedRoute.snapshot.params['id']} no es un Id valido`);
      }else{
        this.userId = Number(this.activatedRoute.snapshot.params['id']);
        this.loadUser()
      }
    }

  loadUser():void{
    if(this.userId)
    this.userService.getUserById(this.userId).subscribe({

      next: (user) => console.log(user),
    })
  }
}
