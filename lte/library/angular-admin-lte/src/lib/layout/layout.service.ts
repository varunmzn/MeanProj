import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RoutingService } from '../services/routing.service';

@Injectable()
export class LayoutService {
  public isCustomLayout: BehaviorSubject<any> = new BehaviorSubject(true);

  private customLayout: boolean;
  public data: any;

  /**
   * @method constructor
   * @param routingService [description]
   */
  constructor(
    private routingService: RoutingService
  ) {
    this.init();
  }

  /**
   * [init description]
   * @method init
   * @return [description]
   */
  private init() {
    this.routingService.onChange.subscribe((value) => {
      
      if (value && value[value.length - 1]) {
        if (this.customLayout === undefined || this.customLayout !== value[value.length - 1].data['disableLayout']) {
          this.isCustomLayout.next(value[0]["data"]);
        }
        this.customLayout = value[value.length - 1].data['customLayout'];
      }
    });
  }
}
