import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IVendor } from 'src/app/shared/interfaces/vendor.interface';
import { VendorService } from 'src/app/shared/services/vendor.service';
import { Vendor } from 'src/app/shared/classes/vendor.model';

@Component({
  selector: 'app-admin-vendor',
  templateUrl: './admin-vendor.component.html',
  styleUrls: ['./admin-vendor.component.scss']
})
export class AdminVendorComponent implements OnInit {

  modalRef: BsModalRef;
  vendorName: string;
  arrVendor: Array<IVendor> = [];
  editStatus: boolean;
  vendorID: number;
 
  
  constructor(private modalService: BsModalService, private vendorService: VendorService) { }


  ngOnInit() {
    this.getVendor();
  }

  private getVendor(): void {
    this.vendorService.getJSONVendor().subscribe(
      data => {
        this.arrVendor = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addVendor(): void {
    const newS: IVendor = new Vendor(1, this.vendorName);
    if (this.arrVendor.length > 0) {
      newS.id = this.arrVendor.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {


      this.vendorService.postJSONVendor(newS).subscribe(
        () => {
          this.getVendor();
        }
      );

    }
    else {
      newS.id = this.vendorID;
      this.vendorService.updateJSONVendor(newS).subscribe(
        () => {
          this.getVendor();
        }
      );
    }
    this.editStatus = false;
    this.modalRef.hide();
    this.resetForm();
  }

  deleteVendor(deletetemplate: TemplateRef<any>,vendor: IVendor): void {
   

    this.vendorService.deleteJSONVendor(vendor.id).subscribe(
      () => {
        this.getVendor();
      }
    )
    this.modalRef.hide();
  }

  editVendor(template: TemplateRef<any>, vendor: IVendor): void {
    this.vendorName = vendor.vendorName;
    this.vendorID = vendor.id;
    this.editStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  resetForm(): void {
    this.vendorName = '';

  }

  confirm(): void {
    this.modalRef.hide();
  }

}
