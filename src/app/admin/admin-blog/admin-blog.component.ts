import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { Blog } from 'src/app/shared/classes/blog.model';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  arrBlog: Array<IBlog> = [];
  newsCategory: string;
  blogTitle: string;
  blogNews: string;
  blogID: number;
  productImage: string;
  editStatus: boolean;
  imageArr: Array<string> = [];

  page = 1;
  pageSize = 4;
  collectionSize: number;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  imageStatus: boolean;

  constructor(private blogServ: BlogService,
    private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getBlog();
  }

  private getBlog(): void {
    this.blogServ.getJSONBlog().subscribe(
      data => {
        this.arrBlog = data;
      }
    );
  }

  addNews(): void {

    const newB: IBlog = new Blog(1, this.newsCategory,
                                    this.blogTitle,
                                    this.blogNews,
                                    this.imageArr);
    if (this.arrBlog.length > 0) {
      newB.id = this.arrBlog.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {


      this.blogServ.postJSONBlog(newB).subscribe(
        () => {
          this.getBlog();
        }
      );

    }
    else {
      newB.id = this.blogID;
      this.blogServ.updateJSONBlog(newB).subscribe(
        () => {
          this.getBlog();
        }
      );
    }
    this.editStatus = false;
    this.resetForm();
  }

  deleteNews(blog: IBlog): void {
    this.blogServ.deleteJSONBlog(blog.id).subscribe(
      () => {
        this.getBlog();
      }
    )
  }
  editNews(blog: IBlog): void {
    this.newsCategory = blog.category;
    this.blogTitle = blog.title;
    this.blogNews = blog.news;
    this.blogID = blog.id;
    this.imageArr = blog.image;
    this.editStatus = true;
  }

  resetForm(): void {
    this.newsCategory = '';
    this.blogTitle = '';
    this.blogNews = '';
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
        // this.productImage = data;
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
