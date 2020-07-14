import { PhotoService } from './../../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  URI = 'http://localhost:4000/';
  photos = [];
  constructor(private pService: PhotoService, private router: Router) { }

  ngOnInit(): void {
    this.pService.getPhotos().subscribe( res => this.photos = res, err => console.log(err));
  }
  selectedCard(id: string) {
      this.router.navigate(['/photos', id]);
  }
}
