import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/classes/category.model';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  modalRef: BsModalRef;
  categoryName: string;
  arrCategory: Array<ICategory> = [];
  editStatus: boolean;
  categoryID: number;
  
  constructor(private modalService: BsModalService, private categService: CategoryService) { }


  ngOnInit() {
    this.getCategory();
  }

  private getCategory(): void {
    this.categService.getJSONCategory().subscribe(
      data => {
        this.arrCategory = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addCategory(): void {
    const newC: ICategory = new Category(1, this.categoryName);
    if (this.arrCategory.length > 0) {
      newC.id = this.arrCategory.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {


      this.categService.postJSONCategory(newC).subscribe(
        () => {
          this.getCategory();
        }
      );

    }
    else {
      newC.id = this.categoryID;
      this.categService.updateJSONCategory(newC).subscribe(
        () => {
          this.getCategory();
        }
      );
    }
    this.editStatus = false;
    this.modalRef.hide();
    this.resetForm();
  }

  deleteCategory(deletetemplate: TemplateRef<any>,category: ICategory): void {
   

    this.categService.deleteJSONCategory(category.id).subscribe(
      () => {
        this.getCategory();
      }
    )
    this.modalRef.hide();
  }

  editCategory(template: TemplateRef<any>, category: ICategory): void {
    this.categoryName = category.categoryName;
    this.categoryID = category.id;
    this.editStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  resetForm(): void {
    this.categoryName = '';

  }

  confirm(): void {
    this.modalRef.hide();
  }

}
