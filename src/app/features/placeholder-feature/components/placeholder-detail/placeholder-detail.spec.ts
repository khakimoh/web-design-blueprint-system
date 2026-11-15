import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Item } from '../../models/item.model';
import { PlaceholderDetail } from './placeholder-detail';

const ITEM: Item = {
  id: 'item-1',
  title: 'First item',
  summary: 'A short summary.',
  status: 'archived',
  updatedAt: '2026-01-31T10:00:00Z',
};

describe('PlaceholderDetail', () => {
  let fixture: ComponentFixture<PlaceholderDetail>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PlaceholderDetail] }).compileComponents();
    fixture = TestBed.createComponent(PlaceholderDetail);
    fixture.componentRef.setInput('item', ITEM);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('renders the title as a heading and the status as text', () => {
    expect(element.querySelector('h3')?.textContent).toContain('First item');
    expect(element.querySelector('.badge')?.textContent?.trim()).toBe('Archived');
  });

  it('emits the item id when the select button is pressed', () => {
    const emitted: string[] = [];
    fixture.componentInstance.selectItem.subscribe((id) => emitted.push(id));

    element.querySelector<HTMLButtonElement>('button')?.click();

    expect(emitted).toEqual(['item-1']);
  });

  it('exposes the active state to assistive technology', async () => {
    fixture.componentRef.setInput('active', true);
    await fixture.whenStable();

    expect(element.querySelector('button')?.getAttribute('aria-pressed')).toBe('true');
  });
});
