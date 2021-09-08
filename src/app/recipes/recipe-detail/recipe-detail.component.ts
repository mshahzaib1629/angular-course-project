import { RecipeService } from "./../../services/recipe.service";
import { Recipe } from "./../recipe.model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}
  @Input("recipeData") recipe: Recipe;

  ngOnInit(): void {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
