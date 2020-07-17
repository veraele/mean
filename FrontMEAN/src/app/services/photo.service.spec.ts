import { TestBed, getTestBed } from '@angular/core/testing';

import { PhotoService } from './photo.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { Photo } from '../interfaces/Photo';

describe('PhotoService', () => {
  let service: PhotoService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const URL = 'http://localhost:3300/api/photos';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retutn an Observable<Photo[]> ', () => {
   service = TestBed.get(PhotoService);
   const dummyPhotos: Photo [] = [
    {title: 'tt', description: 'dd', imagePath: 'u'},
    {title: 't2', description: 'd2', imagePath: 'u2'}];
    service.getPhotos().subscribe(photos => {
      expect(photos).toEqual(dummyPhotos);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPhotos);
  });

  it('should  delete a photo ', () => {
    service = TestBed.get(PhotoService);
    const dummyPhoto: Photo = {title: 'tt', description: 'dd', imagePath: 'u'};
     service.deletePhoto('1').subscribe(photo => {
       expect(photo).toEqual(dummyPhoto);
     });
     const req = httpMock.expectOne(URL+'/'+'1');
     expect(req.request.method).toBe('DELETE');
     req.flush(dummyPhoto);
   });
   
   it('should  update a photo ', () => {
    service = TestBed.get(PhotoService);
    const dummyPhoto: Photo = {title: 'tt', description: 'dd', imagePath: 'u'};
     service.updatePhoto('1','tt','dd').subscribe(photo => {
       expect(photo).toEqual(dummyPhoto);
     });
     const req = httpMock.expectOne(URL+'/'+'1');
     expect(req.request.method).toBe('PUT');
     req.flush(dummyPhoto);
   }); 

   it('should  create a photo ', () => {
    service = TestBed.get(PhotoService);
    const file: File = new File([''], 'filename', { type: 'text/html' });
    const dummyPhoto: Photo = {title: 'tt', description: 'dd', imagePath: 'u'};
     service.createPhoto('1','tt',file).subscribe(photo => {
       expect(photo).toEqual(dummyPhoto);
     });
     const fd = new FormData();
     fd.append('title', 'tt');
     fd.append('description', 'dd');
     fd.append('image', file);
     
     const req = httpMock.expectOne(URL);
     expect(req.request.method).toBe('POST');
     req.flush(dummyPhoto);
   }); 
});
