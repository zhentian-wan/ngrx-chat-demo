/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RefreshMessageListService } from './refresh-message-list.service';

describe('RefreshMessageListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshMessageListService]
    });
  });

  it('should ...', inject([RefreshMessageListService], (service: RefreshMessageListService) => {
    expect(service).toBeTruthy();
  }));
});
