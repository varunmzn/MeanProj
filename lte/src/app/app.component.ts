import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';


 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public customLayout: boolean;
  public layoutName: string;
  public editorValue: string = '';

  constructor(
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: any) => {
      this.customLayout = value.customLayout;
      this.layoutName = value.layoutName;
        });
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app';
// }

