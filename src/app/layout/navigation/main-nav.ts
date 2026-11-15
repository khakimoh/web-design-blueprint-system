import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavItem } from '../../shared/models/nav-item.model';

/** Primary navigation list. Marks the current page with aria-current="page". */
@Component({
  selector: 'app-main-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-nav.html',
})
export class MainNav {
  readonly items = input.required<readonly NavItem[]>();
  /** Accessible name; required when a page has more than one <nav>. */
  readonly label = input('Main');
}
