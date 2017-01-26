/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaveNewMessageService } from './save-new-message.service';

describe('SaveNewMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveNewMessageService]
    });
  });

  it('should ...', inject([SaveNewMessageService], (service: SaveNewMessageService) => {
    expect(service).toBeTruthy();
  }));
});
