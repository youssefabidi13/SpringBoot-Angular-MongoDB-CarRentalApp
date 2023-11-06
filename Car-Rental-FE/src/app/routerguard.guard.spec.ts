import { TestBed } from '@angular/core/testing';

import { RouterguardGuard } from './routerguard.guard';

describe('RouterguardGuard', () => {
  let guard: RouterguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouterguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
