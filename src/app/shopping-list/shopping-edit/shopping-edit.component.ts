import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';




@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', { static: false }) slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(
        private slService: ShoppingListService,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit() {

        this.subscription = this.store.select('shoppingList').subscribe(startData => {
            if (startData.editedIngredientIndex > -1) {
                this.editMode = true;
                this.editedItem = startData.editedIngredient;

                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });

            }
            else {
                this.editMode = false;
            }
        });


    }



    onSubmit(form: NgForm) {

        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);


        if (this.editMode) {
            //this.slService.updateIngredint(this.editedItemIndex, newIngredient);

            this.store.dispatch(
                new ShoppingListAction.UpdateIngredient(newIngredient)
            );

        }
        else {

            // this.slService.addIngredient(newIngredient);

            this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
        }
        this.editMode = false;
        form.reset();

    }
    
    onClear() {
        this.slForm.reset();
        this.editMode = false;
        this.store.dispatch(new ShoppingListAction.StopEdit());
    }
    OnDelete() {

        //this.slService.deleteIngredient(this.editedItemIndex);

        this.store.dispatch(new ShoppingListAction.DeleteIngredient());

        this.onClear();

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new ShoppingListAction.StopEdit());
    }
}
