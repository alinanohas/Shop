import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  view: IBlog = null;
  blogs : Array<IBlog>= [];


  constructor(private blogServ: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }


  ngOnInit(): void {
    AOS.init({
      duration: 400,
      })
    this.getBlog();
    this.getAllBlogs();

  }
  private getAllBlogs(): void {
    // const blog = this.activatedRoute.snapshot.paramMap.get('blog');
    this.blogServ.getJSONBlog().subscribe(
      data => {
        this.blogs = data;
      }
    );
  }
  private getBlog(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.blogServ.getOneBlog(id).subscribe(
      data => {
        this.view = data;
      }
    );
  }

  readBlog(bl) {
    this.view = bl;
  }

}
