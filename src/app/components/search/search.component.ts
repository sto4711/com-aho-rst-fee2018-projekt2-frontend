import { Component  } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject, Subscriber} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Article} from '../../services/admin/article/article';
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
   articlesResult: any;

   stateCtrl = new FormControl();
   filteredStates: Observable<State[]>;

   articles = [];

   constructor(
     private articleService: ArticleService,

 ) {
     this.filteredStates = this.stateCtrl.valueChanges

       .pipe(
         startWith(''),
         map(article => article ? this._filterStates(article) : this.articles.slice())
       );

   }

   private _filterStates(value: string): State[] {
     const filterValue = value.toLowerCase();
      if (filterValue.length >= 3) {
       this.articlesResult = this.articleService.searchArticles(filterValue)
         .subscribe(
           result => {
             this.articles = result;
           }
         );
       return this.articles.filter(article => article.name.toLowerCase().indexOf(filterValue) === 0);

     }
     else{
       this.articles = [];
       return this.articles;
      }

   }
}
