import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSubcategoryComponent } from './admin/admin-subcategory/admin-subcategory.component';

import { AdminVendorComponent } from './admin/admin-vendor/admin-vendor.component';
import { AdminSizeComponent } from './admin/admin-size/admin-size.component';
import { AdminColorComponent } from './admin/admin-color/admin-color.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileGuard } from './shared/guards/profile.guard';
import { LoginComponent } from './login/login.component';
import { UserInfoComponent } from './profile/user-info/user-info.component';
import { UserWishlistComponent } from './profile/user-wishlist/user-wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop/:category', component: ProductsComponent },
  { path: 'shop/:category/:id', component: ProductsDetailsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard], 

},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: AdminProductsComponent },
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'blog', component: AdminBlogComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'subcategory', component: AdminSubcategoryComponent },
    { path: 'vendor', component: AdminVendorComponent },
    { path: 'size', component: AdminSizeComponent },
    { path: 'color', component: AdminColorComponent },
  ] },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
