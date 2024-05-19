import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedRequest = req.clone({
    headers: req.headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
  })
  console.log("authorization", `Bearer ${localStorage.getItem("token")}`)
  return next(modifiedRequest);
};