import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RecipeService } from './../../services/recipe.service';
import { EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{

  // we can't listen to an event in grandchildren component, e.g. recipes.component will not be able to
  // handle eventEmitter fired from recipe-item.component which is:
  // recipes.component > recipes-list.component > recipe-item.component
  // therefore, we have to add a handler here in the middle of the grandparent & grandchild component.
  // For that case, we added a function below with name onRecpieSelected
  constructor(private recipesService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  // here Recipe[] is for defining datatype. i.e. List of Recipes
  recipes: Recipe[];
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.recipesService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    console.log('clicked');
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
