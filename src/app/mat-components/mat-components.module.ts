import { NgModule } from '@angular/core';
 import {MatInputModule} from '../../../node_modules/@angular/material/input';
import {MatFormFieldModule} from '../../../node_modules/@angular/material/form-field';
import {MatCheckboxModule} from '../../../node_modules/@angular/material/checkbox';
import {MatAutocompleteModule} from '../../../node_modules/@angular/material/autocomplete';
import {MatDialogModule} from '../../../node_modules/@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material';
import {MatSelectModule} from '../../../node_modules/@angular/material/select';
import {MatBadgeModule} from '../../../node_modules/@angular/material/badge';

@NgModule({
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatBadgeModule
  ]
})
export class MatComponentsModule { }
