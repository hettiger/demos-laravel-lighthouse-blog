import { Component, OnInit } from '@angular/core';
import { PostFormAction } from '../post-form/post-form.component';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  action: PostFormAction;

  constructor(postsService: PostsService) {
    this.action = postsService.update.bind(postsService);
  }

  ngOnInit(): void {
  }
}
