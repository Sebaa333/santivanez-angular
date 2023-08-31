import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { adminGuard } from "../core/guards/admin.guard";

@NgModule({
    imports:[
        RouterModule.forChild(
        [
            {
            path:'home',
            component: HomeComponent
            },
            {
            path:'users',
            canActivate:[adminGuard],
            loadChildren:() => import('./pages/users/users.module').then((m) => m.UsersModule )
            },
            {
            path: 'courses',
            loadChildren:() => import('./pages/courses/courses.module').then((m)=> m.CoursesModule)
            },
            {
            path: 'buyers',
            loadChildren: () =>
                import('./pages/buyers/buyers.module').then((m) => m.BuyersModule),
            },
            {
            path: 'sales',
            loadChildren: () =>
                import('./pages/sales/sales.module').then((m) => m.SalesModule),
              },
            {
            path:'categories',
            loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule)
            },
            {
            path: '**',
            redirectTo: 'home'
            },
        ])
    ],
    exports:[
        RouterModule
    ]
})
export class DashboardRoutingModule{}