import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit,OnDestroy {

  displayedColumns=['date','name','calories','duration','state'];
  dataSource=new MatTableDataSource<Exercise>();
  @ViewChild(MatSort,{static:false}) sort:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;
  exerciseFinishedSubcription:Subscription;

  constructor(private tariningService:TrainingService) { }

  ngOnInit() {
  this.exerciseFinishedSubcription=this.tariningService.exerciseFinishedChanged.subscribe((exercise:Exercise[])=>{
      this.dataSource.data=exercise;
    })
    this.tariningService.fetchCompletedOrCancelledExercise();
  }
  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  ngOnDestroy(){
    this.exerciseFinishedSubcription.unsubscribe();
  }

}
