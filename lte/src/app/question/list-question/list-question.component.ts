import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { QuestionsService } from '../../services/questions/questions.service';
import { MatSort } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

// import { BehaviorQuestion } from 'rxjs/BehaviorQuestion';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit, OnDestroy {

  MyDataSource: any;
  displayedColumns = ['_id', 'questionName',  'buttons'];
  navigationSubscription;
  constructor(public QuestionsService: QuestionsService, private router: Router) {

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
    this.QuestionsService.listQuestions()
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
    this.QuestionsService.delQuestion(id).subscribe((result) => {
      //  console.log(result)
      alert("Deleted");
      // this.router.navigate(['listquestion']);
    });
    this.router.navigate(['listquestion']);
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
