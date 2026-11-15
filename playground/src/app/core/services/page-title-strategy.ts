import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

/** "<Section> · Design System Playground" for every route. */
@Injectable()
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const section = this.buildTitle(snapshot);
    this.title.setTitle(section ? `${section} · Design System Playground` : 'Design System Playground');
  }
}
