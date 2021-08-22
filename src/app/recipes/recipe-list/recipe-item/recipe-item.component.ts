import { EventEmitter } from '@angular/core';
import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor() { }
  @Input('recipeData') recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();
  ngOnInit(): void {
  }

  onSelected(){
    this.recipeSelected.emit();
  }

}
