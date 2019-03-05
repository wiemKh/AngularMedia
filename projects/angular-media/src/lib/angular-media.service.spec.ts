import { TestBed } from '@angular/core/testing';

import { AngularMediaService } from './angular-media.service';

describe('AngularMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularMediaService = TestBed.get(AngularMediaService);
    expect(service).toBeTruthy();
  });
});
