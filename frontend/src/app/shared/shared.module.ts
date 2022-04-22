import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MatIconModule } from '@angular/material/icon';

const sharedDeclarations = [
  MainNavComponent,
];

const sharedModules = [
  CommonModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    ...sharedDeclarations,
    MainNavComponent,
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
