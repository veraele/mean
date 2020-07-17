import { PhotoService } from './../../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pService: PhotoService) { }
  id: string;
  URI = 'http://localhost:3300/';
  photo: Photo;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.pService.getPhoto(this.id).subscribe(
        res => this.photo = res,
        err => console.log(err)
      );
    });
  }
  deletePhoto(id: string) {
    this.pService.deletePhoto(id)
      .subscribe( res => {
        console.log(res);
        this.router.navigate(['/photos']);
      });
  }
  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.pService.updatePhoto(this.id, title.value, description.value)
      .subscribe( res => {
        console.log(res);
        this.router.navigate(['/photos']);
      });
    return false;
  }
}
