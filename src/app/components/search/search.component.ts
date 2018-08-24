import { Component  } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Article} from '../../services/articles/article';
import {ArticleService} from '../../services/articles/article.service';

export interface State {
  brand: string;
  description: string;
  imageURL: string;
  name: string;
  price: string;
  searchTags: string;
  _id: string;
}

 @Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent   {
   articles: any;

   stateCtrl = new FormControl();
   filteredStates: Observable<State[]>;

   states = [];

   constructor(
     private articleService: ArticleService,

 ) {
     this.filteredStates = this.stateCtrl.valueChanges

       .pipe(
         startWith(''),
         map(state => state ? this._filterStates(state) : this.states.slice())
       );

   }

   private _filterStates(value: string): State[] {
     const filterValue = value.toLowerCase();
       this.articles = this.articleService.searchArticles(filterValue)
        .subscribe(
          result => {

            this.states = result;
          }
        );
      return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);

   }

}
