import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const router =inject(Router)
  return inject(Store).select(selectIsAdmin).pipe(
    map((isAdmin)=>{
      if(!isAdmin) {
        console.log(adminGuard.name, 'Te mando otra ves al inicio')
        return router.createUrlTree(['/dashboard/home'])

      }
      return true;
    })
  )
};
