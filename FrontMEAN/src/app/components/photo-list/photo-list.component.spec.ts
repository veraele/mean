import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { of } from 'rxjs';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let router = {navigate: jasmine.createSpy('navigate')};
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
        { provide: Router, useValue: router }
      ],
      declarations: [ PhotoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(inject ([PhotoService], s => {
    pService = s;
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    component.selectedCard('1');
    expect (router.navigate).toHaveBeenCalledWith(['/photos', '1' ]);
  });

  it('should load photos', () => {
    let res: any =[];
    spyOn(pService, 'getPhotos').and.returnValue(of(res));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.photos).toEqual(res);
  })

});
