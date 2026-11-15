import { HttpErrorResponse } from '@angular/common/http';

/** Closed set of error kinds the UI knows how to present. */
export type AppErrorKind =
  | 'network'
  | 'timeout'
  | 'unauthorized'
  | 'forbidden'
  | 'not-found'
  | 'validation'
  | 'conflict'
  | 'server'
  | 'unknown';

/** The only error shape that stores and components handle. */
export interface AppError {
  readonly kind: AppErrorKind;
  /** HTTP status when the error came from a response, otherwise null. */
  readonly status: number | null;
  /** Key for a user-facing message; never a raw server message. */
  readonly messageKey: string;
  /** Field-level messages for `validation` errors, keyed by field name. */
  readonly fieldErrors: Readonly<Record<string, readonly string[]>>;
}

export function isAppError(value: unknown): value is AppError {
  return typeof value === 'object' && value !== null && 'kind' in value && 'messageKey' in value;
}

/** Maps anything thrown or returned as an error to an AppError. */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }
  if (error instanceof HttpErrorResponse) {
    const kind = kindFromStatus(error.status);
    return {
      kind,
      status: error.status || null,
      messageKey: `errors.${kind}`,
      fieldErrors: kind === 'validation' ? readFieldErrors(error.error) : {},
    };
  }
  if (error instanceof Error && error.name === 'TimeoutError') {
    return { kind: 'timeout', status: null, messageKey: 'errors.timeout', fieldErrors: {} };
  }
  return { kind: 'unknown', status: null, messageKey: 'errors.unknown', fieldErrors: {} };
}

function kindFromStatus(status: number): AppErrorKind {
  if (status === 0) return 'network';
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'not-found';
  if (status === 408 || status === 504) return 'timeout';
  if (status === 409) return 'conflict';
  if (status === 400 || status === 422) return 'validation';
  if (status >= 500) return 'server';
  return 'unknown';
}

/**
 * Reads `{ errors: { field: string[] } }`. Adapt this single function when the
 * project's API reports validation errors in a different shape.
 */
function readFieldErrors(body: unknown): Readonly<Record<string, readonly string[]>> {
  if (typeof body !== 'object' || body === null || !('errors' in body)) {
    return {};
  }
  const errors = (body as { errors: unknown }).errors;
  if (typeof errors !== 'object' || errors === null) {
    return {};
  }
  const result: Record<string, readonly string[]> = {};
  for (const [field, messages] of Object.entries(errors)) {
    if (Array.isArray(messages)) {
      result[field] = messages.filter((m): m is string => typeof m === 'string');
    }
  }
  return result;
}
