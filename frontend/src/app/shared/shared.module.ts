import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionsComponent } from './components/actions/actions.component';
import { FormsModule } from '@angular/forms';

const sharedDeclarations = [
  MainNavComponent,
  ActionsComponent,
];

const sharedModules = [
  CommonModule,
  FormsModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    ...sharedDeclarations,
  ],
  imports: [
    RouterModule,
    ...sharedModules,
  ],
  exports: [
    ...sharedDeclarations,
    ...sharedModules,
  ]
})
export class SharedModule { }
