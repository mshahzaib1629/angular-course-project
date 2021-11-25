import { RecipesRoutingModule } from './recipes-routing.module';
import { RouterModule } from '@angular/router';

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    // // we'll have to use it if we don't have any routes associated with this
    // // module but we have router-outlet tags in it
    // RouterModule,
    // use CommonModule instead of BrowersModule
    // adding routing only belonging to recipes
    RecipesRoutingModule,
    SharedModule
  ],
  // // we don't need to export these components because we are not using them in app or any of its child components as
  // // we are handling all of these in this module including their routing.
  // exports: [
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent,
  // ]
})
export class RecipeModule {}
