/** One entry of a navigation list. */
export interface NavItem {
  readonly label: string;
  /** Router path, e.g. "/items". */
  readonly path: string;
  /** Match the path exactly when marking the item as current. */
  readonly exact?: boolean;
}
