import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private heroService: HeroService) {}

  heroes: [];
  count = 0;
  limit = 5;
  offset = 0;
  total = 0;
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.getHeroes(this.limit, this.offset);
  }

  getHeroes(limit: number, offset: number) {
    console.log('limit: ', limit);
    console.log('offset: ', offset);
    this.heroService.getHeroes(limit, offset).subscribe((heroes) => {
      console.log('Data @ Controller: ', heroes);
      this.heroes = heroes.result.results;

      this.count = heroes.result.count;
      this.limit = heroes.result.limit;
      this.offset = heroes.result.offset;
      this.total = heroes.result.total;
    });
  }

  getHeroesPaging(event: PageEvent) {
    this.limit = event.pageSize;
    console.log("this paging event got called: ", event);
    console.log('this.limit: ', this.limit);
    console.log('event.pageIndex: ', event.pageIndex);
    let newOffset = this.limit * (event.pageIndex);

    console.log('newOffset: ', newOffset);
    this.getHeroes(this.limit, newOffset)

  }
}
