import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { toAppError } from '../errors/app-error';

/**
 * Converts every failed HTTP call into an AppError, once, at the boundary.
 * Services and stores never handle HttpErrorResponse directly.
 */
export const httpErrorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(catchError((error: unknown) => throwError(() => toAppError(error))));
