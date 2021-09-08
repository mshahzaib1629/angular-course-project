import { ShoppingListService } from './../../services/shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef : ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef : ElementRef;
  constructor(private shopingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  // we could also use localReferences to be passed as parameters here with the help of HTMLInputElement
  onAddItem () {
  const ingName = this.nameInputRef.nativeElement.value;
  const ingAmount = this.amountInputRef.nativeElement.value;
  const newIngredient = new Ingredient(ingName, ingAmount);
  this.shopingListService.addIngredient(newIngredient);
  }

}
