import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const token = `${localStorage.getItem("token")}`;
  const decodedToken: {role: string} = jwtDecode(token); 
  //console.log("Role = ", decodedToken.role);
  console.log(decodedToken);
  
  if (decodedToken.role == "SuperAdmin") {
    return true;
  }
  let router = inject(Router);
  router.navigateByUrl("home");
  return false;
};


// Ya adly e3mel mute!!!!!!!!!