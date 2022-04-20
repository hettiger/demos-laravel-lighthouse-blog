import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { PostResolver } from './resolvers/post.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostsComponent
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
