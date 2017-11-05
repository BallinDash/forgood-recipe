import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent implements OnInit {
  addingRecipe = false;
  recipes: any = [];
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.getRecipes();
  }

  cancel() {
    this.addingRecipe = false;
    this.selectedRecipe = null;
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe).subscribe(res => {
      this.recipes = this.recipes.filter(h => h !== recipe);
      if (this.selectedRecipe === recipe) {
        this.selectedRecipe = null;
      }
    });
  }

  getRecipes() {
    return this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  enableAddMode() {
    this.addingRecipe = true;
    this.selectedRecipe = new Recipe();
  }

  onSelect(recipe: Recipe) {
    this.addingRecipe = false;
    this.selectedRecipe = recipe;
  }

  save() {
    if (this.addingRecipe) {
      this.recipeService.addRecipe(this.selectedRecipe).subscribe(recipe => {
        this.addingRecipe = false;
        this.selectedRecipe = null;
        this.recipes.push(recipe);
      });
    } else {
      this.recipeService.updateRecipe(this.selectedRecipe).subscribe(recipe => {
        this.addingRecipe = false;
        this.selectedRecipe = null;
      });
    }
  }
}