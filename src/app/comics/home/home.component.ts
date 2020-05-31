import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/comic.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private comicService: ComicService) {}

  comics: [];
  count = 0;
  limit = 5;
  offset = 0;
  total = 0;
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.getComics(this.limit, this.offset);
  }

  getComics(limit: number, offset: number) {
    console.log('limit: ', limit);
    console.log('offset: ', offset);
    this.comicService.getComics(limit, offset).subscribe((comics) => {
      console.log('Data @ Controller: ', comics);
      this.comics = comics.result.results;

      this.count = comics.result.count;
      this.limit = comics.result.limit;
      this.offset = comics.result.offset;
      this.total = comics.result.total;
    });
  }

  getComicsPaging(event: PageEvent) {
    this.limit = event.pageSize;
    console.log('this paging event got called: ', event);
    console.log('this.limit: ', this.limit);
    console.log('event.pageIndex: ', event.pageIndex);
    let newOffset = this.limit * event.pageIndex;

    console.log('newOffset: ', newOffset);
    this.getComics(this.limit, newOffset);
  }
}
