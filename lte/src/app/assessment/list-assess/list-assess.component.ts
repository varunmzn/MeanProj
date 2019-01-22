import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AssessmentsService } from '../../services/assessments/assessments.service';
import { MatSort } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-assess',
  templateUrl: './list-assess.component.html',
  styleUrls: ['./list-assess.component.css']
})
export class ListAssessComponent implements OnInit, OnDestroy {

  MyDataSource: any;
  displayedColumns = ['_id', 'assessmentName', 'buttons'];
  navigationSubscription;
  constructor(public AssessmentsService: AssessmentsService, private router: Router) {
 // to refresh the same component
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
    this.AssessmentsService.listAssessments()
      .subscribe(
 
        res => {
                 console.log(res);
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
    this.AssessmentsService.delAssessment(id).subscribe((result) => {
      //  console.log(result)
      alert("Deleted");
      // this.router.navigate(['listassessment']);
    });
    this.router.navigate(['listassessment']);
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
