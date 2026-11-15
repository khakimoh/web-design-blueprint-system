import { Component, ElementRef, signal, viewChild } from '@angular/core';

interface Tab {
  readonly id: string;
  readonly label: string;
  readonly text: string;
}

@Component({
  selector: 'pg-ui-components-page',
  templateUrl: './ui-components-page.html',
  styleUrl: './ui-components-page.scss',
})
export default class UiComponentsPage {
  protected readonly variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const;
  protected readonly loading = signal(false);
  protected readonly tabs: readonly Tab[] = [
    { id: 'first', label: 'Details', text: 'Tabs switch between views of the same context.' },
    { id: 'second', label: 'Activity', text: 'Arrow keys move between tabs; only the active tab is in the tab order.' },
    { id: 'third', label: 'Settings', text: 'Use links and routes for navigation between pages instead.' },
  ];
  protected readonly activeTab = signal(0);
  protected readonly page = signal(2);

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected simulateLoading(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }

  protected onTabKeydown(event: KeyboardEvent, index: number, list: HTMLElement): void {
    const rtl = getComputedStyle(list).direction === 'rtl';
    const keys: Record<string, number> = {
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1,
      Home: -index,
      End: this.tabs.length - 1 - index,
    };
    const delta = keys[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const next = (index + delta + this.tabs.length) % this.tabs.length;
    this.activeTab.set(next);
    list.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  protected openDialog(): void {
    this.dialog().nativeElement.showModal();
  }

  protected closeDialog(): void {
    this.dialog().nativeElement.close();
  }
}
