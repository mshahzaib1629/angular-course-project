import { RecipeService } from './../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor(private recpieService: RecipeService) {}
  selectedRecipe: Recipe;

  ngOnInit(): void {}
}
