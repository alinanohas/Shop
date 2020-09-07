import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SizeService } from 'src/app/shared/services/size.service';
import { Size } from 'src/app/shared/classes/size.model';
import { ISize } from 'src/app/shared/interfaces/size.interface';


@Component({
  selector: 'app-admin-size',
  templateUrl: './admin-size.component.html',
  styleUrls: ['./admin-size.component.scss']
})
export class AdminSizeComponent implements OnInit {

  modalRef: BsModalRef;
  sizeName: string;
  arrSize: Array<ISize> = [];
  editStatus: boolean;
  sizeID: number;
 
  
  constructor(private modalService: BsModalService, private sizeService: SizeService) { }


  ngOnInit() {
    this.getSize();
  }

  private getSize(): void {
    this.sizeService.getJSONSize().subscribe(
      data => {
        this.arrSize = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addSize(): void {
    const newS: ISize = new Size(1, this.sizeName);
    if (this.arrSize.length > 0) {
      newS.id = this.arrSize.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {


      this.sizeService.postJSONSize(newS).subscribe(
        () => {
          this.getSize();
        }
      );

    }
    else {
      newS.id = this.sizeID;
      this.sizeService.updateJSONSize(newS).subscribe(
        () => {
          this.getSize();
        }
      );
    }
    this.editStatus = false;
    this.modalRef.hide();
    this.resetForm();
  }

  deleteSize(deletetemplate: TemplateRef<any>,size: ISize): void {
   

    this.sizeService.deleteJSONSize(size.id).subscribe(
      () => {
        this.getSize();
      }
    )
    this.modalRef.hide();
  }

  editSize(template: TemplateRef<any>, size: ISize): void {
    this.sizeName = size.sizeName;
    this.sizeID = size.id;
    this.editStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  resetForm(): void {
    this.sizeName = '';

  }

  confirm(): void {
    this.modalRef.hide();
  }

}
