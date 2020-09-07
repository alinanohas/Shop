import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminVendorComponent } from './admin/admin-vendor/admin-vendor.component';
import { AdminSizeComponent } from './admin/admin-size/admin-size.component';
import { AdminColorComponent } from './admin/admin-color/admin-color.component';
import { AdminSubcategoryComponent } from './admin/admin-subcategory/admin-subcategory.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { UserInfoComponent } from './profile/user-info/user-info.component';
import { UserWishlistComponent } from './profile/user-wishlist/user-wishlist.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenComponent,
    WomenComponent,
    BlogComponent,
    BasketComponent,
    AboutComponent,
    SearchComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminBlogComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    AdminCategoryComponent,
    AdminVendorComponent,
    AdminSizeComponent,
    AdminColorComponent,
    AdminSubcategoryComponent,
    FilterPipe,
    ProfileComponent,
    LoginComponent,
    AdminOrdersComponent,
    UserInfoComponent,
    UserWishlistComponent,
    BlogDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
