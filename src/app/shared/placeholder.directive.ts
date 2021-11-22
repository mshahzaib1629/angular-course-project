import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  // ViewContainerRef is the referencet o the place in DOM where we want to load the component
  constructor(public vcRef: ViewContainerRef) {}
}
