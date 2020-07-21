import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PhotoFormComponent } from './photo-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PhotoService } from 'src/app/services/photo.service';
import { Observable, of } from 'rxjs';
import { PhotoListComponent } from '../photo-list/photo-list.component';

describe('PhotoFormComponent', () => {
  let component: PhotoFormComponent;
  let fixture: ComponentFixture<PhotoFormComponent>;
  let pService: PhotoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'photos', component: PhotoListComponent}
      ])
      ],
      providers:[
        PhotoService,
      ],
      declarations: [ PhotoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(inject([PhotoService], s => {
    pService = s;
    fixture = TestBed.createComponent(PhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(' assign photo ', () => {
    const result = jasmine.createSpyObj('result', ['split']);
    const mockReader = { result } as FileReader;
    const callback = () => component.assignFile(mockReader);
    callback();
    component.assignFile(mockReader);
    fixture.detectChanges();
    expect(component.assignFile(mockReader)).toEqual(jasmine.any(Function));
    expect(component.photoSelected).toEqual(mockReader.result);
  })

  it('file change event should arrive in handler', () => {
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onload']);
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);
    component.onPhotoSelected(mockEvt as any);
    expect((window as any).FileReader).toHaveBeenCalled();
    expect(mockReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });
  
  it('should be called uploadPhoto', ()=> {
    const input = fixture.debugElement.query(By.css('input'));
    const mockTitle = input.nativeElement;
    const mockDescription = input.nativeElement;
    const res = true;
    spyOn(pService, 'createPhoto').and.returnValue(of(res));
    component.uploadPhoto(mockTitle as any, mockDescription as any);
    fixture.detectChanges();
    expect(component.created).toEqual(true);
    
    //expect(pService).toHaveBeenCalled();
    
  });
});
