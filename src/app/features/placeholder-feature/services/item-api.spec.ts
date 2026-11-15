import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { provideAppConfig } from '../../../core/config/app-config';
import { ItemApi, toItem } from './item-api';

describe('toItem', () => {
  it('maps API fields to the application model', () => {
    expect(
      toItem({ id: '7', title: 'Seven', summary: null, status: 'archived', updated_at: '2026-01-01T00:00:00Z' }),
    ).toEqual({ id: '7', title: 'Seven', summary: '', status: 'archived', updatedAt: '2026-01-01T00:00:00Z' });
  });

  it('applies safe defaults for missing or unknown values', () => {
    expect(toItem({ id: '1', status: 'something-new' })).toEqual({
      id: '1',
      title: 'Untitled',
      summary: '',
      status: 'active',
      updatedAt: '',
    });
  });

  it('rejects entries without an id', () => {
    expect(toItem({ title: 'No id' })).toBeNull();
    expect(toItem('not an object')).toBeNull();
  });
});

describe('ItemApi', () => {
  let api: ItemApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAppConfig({ apiBaseUrl: 'https://api.example.test/' }),
        ItemApi,
      ],
    });
    api = TestBed.inject(ItemApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests the item collection and drops unusable entries', async () => {
    const result = firstValueFrom(api.list());

    http.expectOne('https://api.example.test/items').flush([{ id: 'a', title: 'A' }, { title: 'broken' }]);

    expect((await result).map((item) => item.id)).toEqual(['a']);
  });
});
