import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../../entities';

@Component({
  selector: 'app-main-nav, [app-main-nav]',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  @Input() links: Link[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
