import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.services';
import { map} from'rxjs'

export const authGuard: CanActivateFn = (route, state) => {

  const router =inject(Router);
  const authService = inject(AuthService)

  return authService.isAuthenticated().pipe(
    map((isAuth)=>{
      if(isAuth) return true;
      return  router.createUrlTree(['/auth/login']);

    })
  )


  // return  router.createUrlTree(['/auth/login']);
};
