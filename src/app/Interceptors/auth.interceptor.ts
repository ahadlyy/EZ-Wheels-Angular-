import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../Services/loader.service';
import { Observable, finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // let modifiedRequest = req.clone({
  //   headers: req.headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
  // })
  // console.log(`Bearer ${localStorage.getItem("token")}`);
  
  let _loader = inject(LoaderService);
  _loader.setContentLoader(true);
  return next(req).pipe(
    finalize(() =>{
       _loader.setContentLoader(false)
      })
  )
};