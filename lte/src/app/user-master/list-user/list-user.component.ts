import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UsersService } from '../../services/users/users-service.service';
import { MatSort } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {

  MyDataSource: any;
  displayedColumns = ['_id', 'firstName', 'lastName', 'email', 'password', 'mobile', 'gender', 'age', 'buttons'];
  navigationSubscription;
  constructor(public UsersService: UsersService, private router: Router) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });



  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.RenderDataTable();
  }

  RenderDataTable() {
    this.UsersService.listUsers()
      .subscribe(
        res => {
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = res;
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;
          // console.log(this.MyDataSource.data);  
        },
        error => {
          console.log('There was an error while retrieving Posts !!!' + error);
        });
  }

  onDel(id: number) {
    this.UsersService.delUser(id).subscribe((result) => {
      //  console.log(result)
      alert("Deleted");
      // this.router.navigate(['listuser']);
    });
    this.router.navigate(['listuser']);
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.RenderDataTable();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}  