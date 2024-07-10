import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NumberTransformerService } from './number-transformer.service';

describe('NumberTransformerService', () => {
  let service: NumberTransformerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NumberTransformerService]
    });
    service = TestBed.inject(NumberTransformerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform number correctly', () => {
    const number = 3;
    const mockResponse = 'FOO';

    service.transformNumber(number).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/transform/${number}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
