import { RecipeService } from './../../../services/recipe.service';
import { EventEmitter } from '@angular/core';
import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  @Input('recipeData') recipe: Recipe;
  @Input('recipeIndex') index: number;
  ngOnInit(): void {}

}
