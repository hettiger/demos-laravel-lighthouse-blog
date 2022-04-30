import { Directive, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavigationHistoryService } from '../../services/navigation-history.service';

@Directive({
  selector: '[appBackButton]'
})
export class BackButtonDirective {

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navigationHistoryService: NavigationHistoryService,
  ) { }

  @HostListener('click')
  navigateBack() {
    if (this.navigationHistoryService.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute, replaceUrl: true });
    }
  }

}
