import { Component, OnInit } from '@angular/core';
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
  limit = 0;
  offset = 0;
  total = 0;

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => {
      console.log('Data @ Controller: ', heroes);
      this.heroes = heroes.result.results;

      this.count = heroes.result.count;
      this.limit = heroes.result.limit;
      this.offset = heroes.result.offset;
      this.total = heroes.result.total;
    });
  }
}
