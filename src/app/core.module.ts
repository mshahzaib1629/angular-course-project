import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./services/interceptors/auth-interceptor.service";
import { RecipeService } from "./services/recipe.service";
import { ShoppingListService } from "./services/shopping-list.service";

// core module is totally optional, recommended approach is
// using Injectable decorator's field 'providedIn: root'
@NgModule ({
  // instead of components, services don't require to be exported
  // because services are automatically injected at root level
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {

}
