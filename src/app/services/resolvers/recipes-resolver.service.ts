import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from './../../recipes/recipe.model';
import { DataStorageService } from './../data-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  // resolve allow angular to fetch data automatically in background when page is refreshed
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length > 0) {
      // this is to avoid the case: whenever user used to edit the recipe,
      // resolver fetched the data present in db, instead of local (changed) data
      return recipes;
    } else {
      return this.dataStorageService.fetchRecipes();
    }
  }
}
