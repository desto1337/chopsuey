import { TestBed } from '@angular/core/testing';

import { ContactdecryptionService } from './contactdecryption.service';

describe('ContactdecryptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactdecryptionService = TestBed.get(ContactdecryptionService);
    expect(service).toBeTruthy();
  });
});
