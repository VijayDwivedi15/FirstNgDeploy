import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({

    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})

export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Observable<{ ingredients: Ingredient[] }>;
    private igChangeSub: Subscription;

    constructor(
        private slService: ShoppingListService,
        private logingservice: LoggingService,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');
        // this.ingredients = this.slService.getIngredients();
        // this.igChangeSub = this.slService.ingredientChanged.subscribe(
        //     (ingredients: Ingredient[]) => {
        //         this.ingredients = ingredients;
        //     }
        // );

        this.logingservice.printLog('hello from Shopping-list NgOnInit');

    }

    OnEditItem(index: number) {

        // this.slService.startedEditing.next(index);
        this.store.dispatch(new ShoppingListActions.StartEdit(index));

    }

    ngOnDestroy(): void {
        // this.igChangeSub.unsubscribe();
    }


}