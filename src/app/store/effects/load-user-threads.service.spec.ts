/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadUserThreadsService } from './load-user-threads.service';

describe('LoadUserThreadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadUserThreadsService]
    });
  });

  it('should ...', inject([LoadUserThreadsService], (service: LoadUserThreadsService) => {
    expect(service).toBeTruthy();
  }));
});
