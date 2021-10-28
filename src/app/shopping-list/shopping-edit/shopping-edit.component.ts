import { Subscription } from 'rxjs';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') shoppingListForm: NgForm;

  constructor(private shopingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shopingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shopingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  // we could also use localReferences to be passed as parameters here with the help of HTMLInputElement
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode == true) {
      this.shopingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shopingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear () {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shopingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
