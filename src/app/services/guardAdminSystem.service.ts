import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthAdminSystemGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = localStorage.getItem('currentUser')
    if (user) {
      if (JSON.parse(user).role === 'admin2') {
        console.log(111111)
        return true;
      }else{
        this.router.navigate(['/login-admin'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login-admin'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}