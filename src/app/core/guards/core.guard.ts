import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";

import { UserService } from "@service/user.service";
import { map, tap } from "rxjs/operators";

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isLoggedIn.pipe(
    tap(ev => ev ? true : router.navigate(['/login'], {
        queryParams: { 
          message: 'Please Login.',
          path: segments.length === 0 ? '/' :
            segments
              .map(s => s.path)
              .reduce((prev, curr, idx) => `${idx > 1 ? '' : '/'}${prev}/${curr}`) 
        }
      })
    ));
}

export const pageGuard = (neededPermission: string[]) => (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.currentPermission.pipe(
    map(p => neededPermission.some(np => p.includes(np))),
    tap(p => p ? true : router.navigate(['/']))
  )
}