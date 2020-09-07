import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IColor } from 'src/app/shared/interfaces/color.interface';
import { ColorService } from 'src/app/shared/services/color.service';
import { Color } from 'src/app/shared/classes/color.model';

@Component({
  selector: 'app-admin-color',
  templateUrl: './admin-color.component.html',
  styleUrls: ['./admin-color.component.scss']
})
export class AdminColorComponent implements OnInit {
  modalRef: BsModalRef;
  colorName: string;
  selected: string ;
  arrColor: Array<IColor> = [];
  editStatus: boolean;
  colorID: number;
 
  
  constructor(private modalService: BsModalService, private colorService: ColorService) { }


  ngOnInit() {
    this.getColor();
 
    
  }

   myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  private getColor(): void {
    this.colorService.getJSONColor().subscribe(
      data => {
        this.arrColor = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addColor(): void {
    const newS: IColor = new Color(1, this.colorName, false);
    if (this.arrColor.length > 0) {
      newS.id = this.arrColor.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {


      this.colorService.postJSONColor(newS).subscribe(
        () => {
          this.getColor();
        }
      );

    }
    else {
      newS.id = this.colorID;
      this.colorService.updateJSONColor(newS).subscribe(
        () => {
          this.getColor();
        }
      );
    }
    this.editStatus = false;
    this.modalRef.hide();
    this.resetForm();
  }

  deleteColor(deletetemplate: TemplateRef<any>,color: IColor): void {
   

    this.colorService.deleteJSONColor(color.id).subscribe(
      () => {
        this.getColor();
      }
    )
    this.modalRef.hide();
  }

  editColor(template: TemplateRef<any>, color: IColor): void {
    this.colorName = color.colorName;
    this.colorID = color.id;
    this.editStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  resetForm(): void {
    this.colorName = '';

  }

  confirm(): void {
    this.modalRef.hide();
  }

}
