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
  created: boolean;
  constructor(private pService: PhotoService, private router: Router) { }

  ngOnInit(): void {
  }
  assignFile(reader: FileReader): any{
    this.photoSelected = reader.result;
    return () => { this.photoSelected = reader.result;}
  }
  onPhotoSelected(event: Event): void {
    const target = <HTMLInputElement>event.target;
    if (target.files && target.files[0]) {
      this.file = (target.files[0] as File);
      const reader = new FileReader();
      reader.onload = this.assignFile(reader);
      reader.readAsDataURL(this.file);
    }
  }
  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.pService.createPhoto(title.value, description.value, this.file).subscribe(res => {
      this.created = true;
      this.router.navigate(['/photos']);
    });
    return false;
  }
}
