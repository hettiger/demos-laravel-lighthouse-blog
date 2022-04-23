import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { CreatePostComponent } from './components/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostsComponent,
    resolve: { posts: PostsResolver }
  },
  {
    path: 'create',
    component: CreatePostComponent
  },
  {
    path: ':id',
    component: PostComponent,
    resolve: { post: PostResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
