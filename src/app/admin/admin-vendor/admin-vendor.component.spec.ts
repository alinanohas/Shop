import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVendorComponent } from './admin-vendor.component';

describe('AdminVendorComponent', () => {
  let component: AdminVendorComponent;
  let fixture: ComponentFixture<AdminVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
