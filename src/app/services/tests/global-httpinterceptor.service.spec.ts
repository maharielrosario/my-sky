import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GlobalHTTPInterceptorService } from '../global-httpinterceptor.service';

describe('GlobalHTTPInterceptorService', () => {
  let service: GlobalHTTPInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(GlobalHTTPInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
