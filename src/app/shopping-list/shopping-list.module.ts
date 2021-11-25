import { SharedModule } from './../shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    // // adding routings only belonging to shoppingList
    // ShoppingListRoutingModule,
    // // OR as we have only one route of shopping, we can declare it here instead of making a new file for routing
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
      },
    ]),
// importing SharedModule to get common components and avoiding re-writing
    SharedModule,
  ],
})
export class ShoppingListModule {}
