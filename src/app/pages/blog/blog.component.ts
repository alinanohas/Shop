import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  blogs : Array<IBlog>= [];
  constructor(private blogServ: BlogService, private activatedRoute: ActivatedRoute, private route :Router) {
    this.route.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.getBlog();

      }
    })
   }
  ngOnInit(): void {
    this.getBlog();

  }
  private getBlog(): void {
    this.blogServ.getJSONBlog().subscribe(
      data => {
        this.blogs = data;
      }
    );
  }
}
