import { TestBed } from '@angular/core/testing';

import { GlobalHTTPInterceptorService } from '../global-httpinterceptor.service';

describe('GlobalHTTPInterceptorService', () => {
  let service: GlobalHTTPInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalHTTPInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
