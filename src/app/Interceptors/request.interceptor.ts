import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  let token:string =`${localStorage.getItem("token")}`;
  let parsedToken = JSON.parse(token);
  let modifiedRequest = req.clone({
   
    headers: req.headers.set("authorization", `Bearer ${parsedToken}`)
  }) 
  return next(modifiedRequest);

};