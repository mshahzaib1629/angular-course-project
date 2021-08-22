import { EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  // we can't listen to an event in grandchildren component, e.g. recipes.component will not be able to 
  // handle eventEmitter fired from recipe-item.component which is: 
  // recipes.component > recipes-list.component > recipe-item.component
  // therefore, we have to add a handler here in the middle of the grandparent & grandchild component. 
  // For that case, we added a function below with name onRecpieSelected
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  constructor() { }
  
  // here Recipe[] is for defining datatype. i.e. List of Recipes
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg'),
    new Recipe('Another Recipe', 'This is another test recipe here', 'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg')
  ];

  ngOnInit(): void {
  }

onRecipeSelected (recipe: Recipe) {
  this.recipeWasSelected.emit(recipe);
}  

}
