import { Subject } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  constructor(private shoppinglistService: ShoppingListService) {}
  recipes: Recipe[] = [
    // new Recipe(
    //   'Tasty Potatoes',
    //   'It is super tasty, check it now!',
    //   'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
    //   [new Ingredient('Meat', 1), new Ingredient('Frech Fries', 20)]
    // ),
    // new Recipe(
    //   'Chicken Karai',
    //   'Having an awesome meal, what you need else?',
    //   'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg',
    //   [new Ingredient('Chicken', 2), new Ingredient('Masala', 10)]
    // ),
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // using .slice avoid returing the recpies with reference, instead it will create a new array before returning
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
    // const targetedRecipe = this.recipes.find((recipe) => {
    //   return recipe.id == id;
    // });
    // return targetedRecipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
