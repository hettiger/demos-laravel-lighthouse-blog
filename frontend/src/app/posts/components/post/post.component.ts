import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { Post } from '../../entities';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Post>;

  constructor(activatedRoute: ActivatedRoute) {
    this.post$ = activatedRoute.data.pipe(pluck('post'));
  }

  ngOnInit(): void { }
}
