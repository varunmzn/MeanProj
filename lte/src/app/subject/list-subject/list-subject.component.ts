import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { MatSort } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.css']
})
export class ListSubjectComponent implements OnInit, OnDestroy {

  MyDataSource: any;
  displayedColumns = ['_id', 'subjectName','buttons'];
  navigationSubscription;
  constructor(public SubjectsService: SubjectsService, private router: Router) {

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
    this.SubjectsService.listSubjects()
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
    this.SubjectsService.delSubject(id).subscribe((result) => {
      //  console.log(result)
      alert("Deleted");
      // this.router.navigate(['listsubject']);
    });
    this.router.navigate(['listsubject']);
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
