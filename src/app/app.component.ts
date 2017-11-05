import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>
    Recipes
  </h1>
  <div class="header-bar"></div>
  <app-recipes></app-recipes>
`,
  styles: []
})
export class AppComponent {
  title = 'app';
}
