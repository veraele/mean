import { PhotoService } from './../../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer;
  constructor(private pService: PhotoService, private router: Router) { }

  ngOnInit(): void {
  }
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = (event.target.files[0] as File);

      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.pService.createPhoto(title.value, description.value, this.file).subscribe(res => {
      this.router.navigate(['/photos']);
    }, err => console.log(err));
    return false;
  }
}
