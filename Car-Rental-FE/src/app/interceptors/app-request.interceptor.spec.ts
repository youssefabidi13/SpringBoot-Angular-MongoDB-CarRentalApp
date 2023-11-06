import { TestBed } from '@angular/core/testing';

import { AppRequestInterceptor } from './app-request.interceptor';

describe('AppRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AppRequestInterceptor = TestBed.inject(AppRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
