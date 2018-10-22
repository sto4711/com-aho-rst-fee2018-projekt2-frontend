import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailComponent } from './article-detail.component';
import {ArticleService} from '../../services/articles/article.service';
import {Observable} from 'rxjs';
import 'rxjs/add/Observable/from';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let articleService: ArticleService;

  beforeEach(async(() => {
    articleService = new ArticleService(null);
    TestBed.configureTestingModule({
      providers: [ArticleService],
      declarations: [ ArticleDetailComponent ]
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change article rating ', () => {
    // arrange
    component.onChangeArticleRating = undefined;

    // act
    component.onChangeArticleRating(1);

    // assert
    expect(component.onChangeArticleRating).toHaveBeenCalled();
  });

  it('should call article details', () => {
    const testArticle = {
        'itemNumber': '10000001',
        'descriptionLangCode': 'ARTICLE-DESCRIPTION-10000001',
        'releaseDate': '2018-09-16T19:20:43.401Z',
        'searchTags': 'e-bike modell 1 superbike ',
        'articleQueryParameter': 'Superbike-E-Bike-Modell-1',
        'rating': [true,true,true,true,true],
        'description': 'description can be found in i18n folder',
        'imageSmallURL': 'image/bikeOrigin_clone_pixelated_small_1.jpg',
        'availability': false,'price':1000.35,
        'imageURL2': 'image/bikeOrigin2_clone_pixelated_1.jpg',
        'imageURL': 'image/bikeOrigin_clone_pixelated_1.jpg',
        'imageURL3': 'image/bikeOrigin3_clone_pixelated_1.jpg',
        'name': 'E-Bike Modell 1',
        '_id': 'xEUehKXKxYo0001',
        'brand': 'Superbike'
      } ;

    spyOn(articleService, 'getArticleDetails').and.callFake(() => {
      return Observable.from([testArticle]);
    });
    component.ngOnInit();

    expect(component.article).toBe(testArticle);
  })
});
