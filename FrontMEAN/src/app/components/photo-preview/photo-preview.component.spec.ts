import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PhotoPreviewComponent } from './photo-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PhotoService } from 'src/app/services/photo.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('PhotoPreviewComponent', () => {
  let component: PhotoPreviewComponent;
  let fixture: ComponentFixture<PhotoPreviewComponent>;
  let pService: PhotoService;
  let router= {navigate: jasmine.createSpy('navigate')};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientModule,
        RouterTestingModule
    ],
    providers:[
    ],
      declarations: [ PhotoPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(inject ( [PhotoService], s => {
    pService = s;
    fixture = TestBed.createComponent(PhotoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a photo', () => {
    let res: any = {title: 'ttt', description: 'dd', imagePath: 'ss'};
    spyOn(pService,'getPhoto').and.returnValue(of(res));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.photo).toEqual(res);
  });

  it('should delete a photo', () => {
    let res:any;
    spyOn(pService,'deletePhoto').and.returnValue(of(res));
    component.deletePhoto('1');
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update a photo', () => {
    let res:any = '';
    const input = fixture.debugElement.query(By.css('input'));
    const mockTitle :any ='';
    const mockDescription :any = '';
    spyOn(pService,'updatePhoto').and.returnValue(of(res));
    component.updatePhoto(mockTitle, mockDescription);
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();

  });
});
