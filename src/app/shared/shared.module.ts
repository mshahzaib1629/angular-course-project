import { PlaceholderDirective } from './placeholder.directive';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  // By declaring components and importing modules here, we'll not have to
  // declare or import them everywhere the are required, instead we'll just import this sharedModule into them
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
