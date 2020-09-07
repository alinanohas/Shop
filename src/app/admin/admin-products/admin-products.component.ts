import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SubcategoryService } from 'src/app/shared/services/subcategory.service';
import { ColorService } from 'src/app/shared/services/color.service';
import { SizeService } from 'src/app/shared/services/size.service';
import { VendorService } from 'src/app/shared/services/vendor.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ISubcategory } from 'src/app/shared/interfaces/subcategory.interface';
import { IColor } from 'src/app/shared/interfaces/color.interface';
import { ISize } from 'src/app/shared/interfaces/size.interface';
import { IVendor } from 'src/app/shared/interfaces/vendor.interface';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/classes/product.model';
import { map, finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})


export class AdminProductsComponent implements OnInit {

  arrCategory: Array<ICategory> = [];
  arrSubcategory: Array<ISubcategory> = [];
  arrColor: Array<IColor> = [];
  arrSize: Array<ISize> = [];
  arrVendor: Array<IVendor> = [];
  adminProducts: Array<IProduct> = [];

  adminData: string;

  productID: number;
  productName: string;
  productDescription: string;
  productNewPrice: number;
  productOldPrice: number;
  productImage: string;
  editStatus: boolean;
  selected: any;
  filtered: any;
  name: string;
  category: ICategory;
  subcategory: ISubcategory;
  size: ISize;
  color: IColor;
  vendor: IVendor;

  imageArr: Array<string> = [];
  categoryName: string;
  subcategoryName: string;
  colorName: string;
  sizeName: string;
  vendorName: string;
  count: number = 1;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  imageStatus: boolean;
  modalRef: BsModalRef;

  order: string = 'p.name';
  reverse: boolean = false;
  sortedCollection: any[];
  userFilter: any;

  page = 1;
  pageSize = 4;
  collectionSize: number;

  constructor(private prService: ProductsService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private vendorService: VendorService,
    private afStorage: AngularFireStorage,
    private modalService: BsModalService
  ) {
    // orderPipe.transform(this.adminProducts, 'p.name');
  }

  ngOnInit() {
    this.getProducts();
    this.getCategory();
    this.getSubcategory();
    this.getColor();
    this.getSize();
    this.getVendor();
  }


  private getCategory(): void {
    this.categoryService.getJSONCategory().subscribe(
      data => {
        this.arrCategory = data;
      }
    );
  }
  private getSubcategory(): void {
    this.subcategoryService.getJSONSubcategory().subscribe(
      data => {
        this.arrSubcategory = data;
      }
    );
  }
  private getColor(): void {
    this.colorService.getJSONColor().subscribe(
      data => {
        this.arrColor = data;
      }
    );
  }
  private getSize(): void {
    this.sizeService.getJSONSize().subscribe(
      data => {
        this.arrSize = data;
      }
    );
  }
  private getVendor(): void {
    this.vendorService.getJSONVendor().subscribe(
      data => {
        this.arrVendor = data;
      }
    );
  }
  private getProducts(): void {
    this.prService.getJSONProducts().subscribe(
      data => {
        this.adminProducts = data;

      }
    );

  }

  addProduct(): void {
    // debugger
    const newP: IProduct = new Product(1,
      this.category.categoryName,
      this.subcategory.subcategoryName,
      this.size.sizeName,
      this.color.colorName,
      this.vendor.vendorName,
      this.productName,
      this.productDescription,
      this.productOldPrice,
      this.productNewPrice,
      this.imageArr,
      this.count);
    if (this.adminProducts.length > 0) {
      newP.id = this.adminProducts.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {


      this.prService.postJSONProducts(newP).subscribe(
        () => {
          this.getProducts();
        }
      );

    }
    else {
      newP.id = this.productID;
      this.prService.updateJSONProducts(newP).subscribe(
        () => {
          this.getProducts();
        }
      );
    }
    this.editStatus = false;
    this.resetForm();
  }

  deleteProduct(deletetemplate: TemplateRef<any>, product: IProduct): void {
    this.prService.deleteJSONProducts(product.id).subscribe(
      () => {
        this.getProducts();
      }
    )
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
  }

  editProduct(product: IProduct): void {
    this.categoryName = product.category;
    this.subcategoryName = product.subcategory;
    this.colorName = product.color;
    this.sizeName = product.size;
    this.vendorName = product.vendor;
    this.productName = product.name;
    this.productDescription = product.description;
    this.productOldPrice = product.oldPrice;
    this.productNewPrice = product.newPrice;
    this.productID = product.id;
    this.imageArr = product.image;
    this.editStatus = true;
  }

  resetForm(): void {
    this.categoryName = '';
    this.subcategoryName = '';
    this.colorName = '';
    this.vendorName = '';
    this.productName = '';
    this.productDescription = '';
    // this.categoryName = '';
    this.productOldPrice = null;
    this.productNewPrice = null;
    this.imageArr = [];
    this.imageStatus = false;

  }

  public upload(event: any): void {
    console.log(event);

    const file = event.target.files[0];
    const filePath = `images/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(data => {
        this.productImage = data;
        // debugger
        this.imageStatus = true;
        this.imageArr.push(data)
      });
    });
  }
  private createUUID(): any {
    const imageArr = [];
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}
