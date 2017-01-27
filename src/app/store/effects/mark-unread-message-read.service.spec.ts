/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarkUnreadMessageReadService } from './mark-unread-message-read.service';

describe('MarkUnreadMessageReadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkUnreadMessageReadService]
    });
  });

  it('should ...', inject([MarkUnreadMessageReadService], (service: MarkUnreadMessageReadService) => {
    expect(service).toBeTruthy();
  }));
});
