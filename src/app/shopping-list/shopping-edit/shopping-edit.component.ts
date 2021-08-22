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
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  // we could also use localReferences to be passed as parameters here with the help of HTMLInputElement
  onAddItem () {
  const ingName = this.nameInputRef.nativeElement.value;
  const ingAmount = this.amountInputRef.nativeElement.value;
  const newIngredient = new Ingredient(ingName, ingAmount);
  this.ingredientAdded.emit(newIngredient);
  }

}
