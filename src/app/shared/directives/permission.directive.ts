import {
  Directive, Input,
  TemplateRef, ViewContainerRef, ElementRef, OnInit,
} from '@angular/core';
import { UserService } from '@service/user.service';
import { Permission } from '@model/ApplicationPermission.model';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[permission]'
})
export class PermissionDirective implements OnInit {
  private currentPermission: string[] = [];
  private permissions: string[] = [];
  private logicalOp = 'AND';
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {
    this.userService.currentPermission.subscribe(p => {
      this.currentPermission = p;
      this.updateView();
    });
  }

  ngOnInit(): void { }

  @Input()
  set permission(val: string[]) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set permissionOperation(op: string) {
    this.logicalOp = op;
    this.updateView();
  }

  private updateView(): void {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission(): boolean {
    let hasPermission = false;

    for (const checkPermission of this.permissions) {
      if (checkPermission === Permission.ALL) {
        hasPermission = true;
        break;
      }

      if (this.currentPermission.length) {
        const permissionFound = this.currentPermission.find(x => x.toUpperCase() === checkPermission.toUpperCase());

        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }

    return hasPermission;
  }
}
