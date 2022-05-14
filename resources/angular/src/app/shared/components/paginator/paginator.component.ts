import { Component, Input, OnInit } from '@angular/core';
import { PaginatorInfo } from '../../../entities';
import { paginatorInfo } from '../../../utilities';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() paginatorInfo: PaginatorInfo = paginatorInfo();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigate(event: PageEvent) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: event.pageIndex + 1,
        perPage: event.pageSize,
      },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
  }
}
