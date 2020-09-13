import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';


@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeservice: RecipeService,
    private store: Store<fromApp.AppState>

  ) { }

  storeRecipes() {
    const recipes = this.recipeservice.getRecipes();
    this.http.put('https://ng-recipe-project-ea27a.firebaseio.com/recipes.json', recipes).
      subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {


    return this.http.get<Recipe[]>('https://ng-recipe-project-ea27a.firebaseio.com/recipes.json'

    ).pipe(map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      });
    }),
      tap(recipes => {
        // this.recipeservice.setRecipes(recipes);
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));
      }));






  }


}