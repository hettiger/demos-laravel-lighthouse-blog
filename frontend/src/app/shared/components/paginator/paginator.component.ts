import { Component, Input, OnInit } from '@angular/core';
import { PaginatorInfo } from '../../../entities';
import { paginatorInfo } from '../../../utilities';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() paginatorInfo: PaginatorInfo = paginatorInfo();

  constructor() { }

  ngOnInit(): void {
  }

}
