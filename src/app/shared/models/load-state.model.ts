/**
 * State of any asynchronously loaded value. Views render one template branch
 * per status; "empty" is derived from a successful result with no data.
 * The error type is a parameter so `shared` stays independent of `core`.
 */
export type LoadState<T, E = unknown> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly error: E };

export const IDLE: LoadState<never, never> = { status: 'idle' };
export const LOADING: LoadState<never, never> = { status: 'loading' };
