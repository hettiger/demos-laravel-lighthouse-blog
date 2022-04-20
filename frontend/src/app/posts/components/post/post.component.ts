import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, pluck } from 'rxjs';
import { Post } from '../../entities';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Post> = EMPTY;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.data.pipe(pluck('post'));
  }

}
