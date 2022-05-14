import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { PostFormAction } from '../post-form/post-form.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {

  action: PostFormAction;

  constructor(postsService: PostsService) {
    this.action = postsService.store.bind(postsService);
  }

  ngOnInit(): void {
  }
}
