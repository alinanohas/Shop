import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubcategoryService } from 'src/app/shared/services/subcategory.service';
import { ISubcategory } from 'src/app/shared/interfaces/subcategory.interface';
import { Subcategory } from 'src/app/shared/classes/subcategory.model';

@Component({
  selector: 'app-admin-subcategory',
  templateUrl: './admin-subcategory.component.html',
  styleUrls: ['./admin-subcategory.component.scss']
})
export class AdminSubcategoryComponent implements OnInit {

  modalRef: BsModalRef;
  subcategoryName: string;
  arrSubcategory: Array<ISubcategory>;
  editStatus: boolean;
  subcategoryID: number;

  constructor(private modalService: BsModalService, private subcategService: SubcategoryService) { }


  ngOnInit() {
    this.getSubcategory();
  }

  private getSubcategory(): void {
    this.subcategService.getJSONSubcategory().subscribe(
      data => {
        this.arrSubcategory = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addSubcategory(): void {
    const newS: ISubcategory = new Subcategory(1, this.subcategoryName);
    if (this.arrSubcategory.length > 0) {
      newS.id = this.arrSubcategory.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {


      this.subcategService.postJSONSubcategory(newS).subscribe(
        () => {
          this.getSubcategory();
        }
      );

    }
    else {
      newS.id = this.subcategoryID;
      this.subcategService.updateJSONSubcategory(newS).subscribe(
        () => {
          this.getSubcategory();
        }
      );
    }
    this.editStatus = false;
    this.modalRef.hide();
    this.resetForm();
  }

  deleteSubcategory(deletetemplate: TemplateRef<any>,subcategory: ISubcategory): void {
   

    this.subcategService.deleteJSONSubcategory(subcategory.id).subscribe(
      () => {
        this.getSubcategory();
      }
    )
    this.modalRef.hide();
  }

  editSubcategory(template: TemplateRef<any>, subcategory: ISubcategory): void {
    this.subcategoryName = subcategory.subcategoryName;
    this.subcategoryID = subcategory.id;
    this.editStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  resetForm(): void {
    this.subcategoryName = '';

  }

  confirm(): void {
    this.modalRef.hide();
  }

}
