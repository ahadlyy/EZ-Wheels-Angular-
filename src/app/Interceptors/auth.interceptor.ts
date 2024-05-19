import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../Services/loader.service';
import { Observable, finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  let modifiedRequest = req.clone({
    setHeaders: {
      Authorization: token
    }
    // headers: req.headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
  })
  let _loader = inject(LoaderService);
  _loader.setContentLoader(true);
  console.log(modifiedRequest)
  // console.log("authorization", `Bearer ${localStorage.getItem("token")}`)
  return next(modifiedRequest).pipe(
    finalize(() =>{
       _loader.setContentLoader(false)
      })
  )
};