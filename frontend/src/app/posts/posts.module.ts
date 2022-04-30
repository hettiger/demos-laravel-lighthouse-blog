import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { SharedModule } from '../shared/shared.module';
import { PostFormComponent } from './components/post-form/post-form.component';


@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    PostFormComponent,
  ],
  imports: [
    PostsRoutingModule,
    SharedModule,
  ]
})
export class PostsModule { }
