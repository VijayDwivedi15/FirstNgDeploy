import { Recipe } from './recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {

    recipesChanged= new Subject<Recipe[]>();


    // recipeSelected = new Subject<Recipe>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Teasty Samosa',
    //         'this is simply a good samosa',
    //         'https://recipes.timesofindia.com/thumb/61050397.cms?imgsize=246859&width=800&height=800',
    //         [
    //             new Ingredient('Dosa', 50),
    //             new Ingredient('Sambhar', 30)
    //         ]),

    //     new Recipe(
    //         'Vada Pav',
    //         'this is simply a good samosa',
    //         'https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/Cheesy_Vada_Pav_Recipe_Britannia_Cheesy_Kitchen_Recipe_Video_20.jpg',
    //         [
    //             new Ingredient('Idly', 30),
    //             new Ingredient('Panner Tikka', 80)
    //         ])

    // ];


    private recipes: Recipe[] = [];

    constructor(
        private slService: ShoppingListService,
        private store: Store<fromApp.AppState>
        ) { }

    setRecipes(recipes : Recipe[])
    {
        this.recipes= recipes;
        this.recipesChanged.next(this.recipes.slice());

    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index :number)
    {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        //this.slService.addingredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }

    addRecipe(recipe: Recipe)
    {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

    } 

    updateRecipe(index:number, newRecipe: Recipe)
    {
       this.recipes[index]= newRecipe;
       this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number)
    {
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice());
    }


}