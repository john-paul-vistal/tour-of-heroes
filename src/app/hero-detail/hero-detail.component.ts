import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero|any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
    ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getHero(parseInt(id||"-1"));
  }

  getHero(id:number): void {
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
