import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent {
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private notification: NotifierService){
     console.log(this.activatedRoute.snapshot.params['id'])
     if(!Number(this.activatedRoute.snapshot.params['id'])){
      this.router.navigate(['dashboard','users']);
      this.notification.showCancel(`${this.activatedRoute.snapshot.params['id']} no es un Id valido`);
     }
  }


  loadUser():void{

  }
}
