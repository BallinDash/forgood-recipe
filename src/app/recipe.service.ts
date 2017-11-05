import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe';

const api = '/api';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }


  getRecipes() {
    return this.http.get<Array<Recipe>>(`${api}/recipes`)
  }

  deleteRecipe(recipe: Recipe) {
    return this.http.delete(`${api}/recipe/${recipe.id}`);
  }

  addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(`${api}/recipe/`, recipe);
  }

  updateRecipe(recipe: Recipe) {
    return this.http.put<Recipe>(`${api}/recipe/${recipe.id}`, recipe);
}

}
