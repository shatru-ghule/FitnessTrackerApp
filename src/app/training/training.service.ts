import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject'
import { Exercise } from './exercise.model';
import { AngularFirestore} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged=new Subject<Exercise>();
  exercisesChanged=new Subject<Exercise[]>();
  exerciseFinishedChanged=new Subject<Exercise[]>();

  private avaibleExercises:Exercise[]=[];
  private runningExercise:Exercise;

  private fbSub:Subscription[]=[];

  constructor(private db:AngularFirestore,private uiService:UIService,private tosterService:ToastrService) { }

  fetchAvaibleExercise(){
   this.uiService.loadingstateChanged.next(true);
    this.fbSub.push( this.db.collection<Exercise>('avaibleExercises')
    .snapshotChanges()
     .pipe(map(docArry =>{
      return docArry.map(doc => {
         return {
           id:doc.payload.doc.id,
           name:doc.payload.doc.data().name,
           duration:doc.payload.doc.data().duration,
           calories:doc.payload.doc.data().calories
         }
       });
     })
     ).subscribe((exercises:Exercise[]) =>{
      this.uiService.loadingstateChanged.next(false);
       this.avaibleExercises=exercises;
       this.exercisesChanged.next([...this.avaibleExercises]);
     },error=>{
       this.uiService.loadingstateChanged.next(false);
       this.tosterService.error("Fetching Exercise Failed, please try again ",null);
       this.exercisesChanged.next(null);
     }));

  }

  startExercise(selectedId:string){
     this.runningExercise= this.avaibleExercises.find(ex =>ex.id === selectedId);
     this.exerciseChanged.next({...this.runningExercise});

  }
    completeExercise(){
     this.addDataToDatabase(
       {
         ...this.runningExercise,
         date:new Date(),
         state:'completed'
        })
     this.runningExercise=null;
     this.exerciseChanged.next(null);
    }
    cancelledExercise(progress:number){
      this.addDataToDatabase(
        {
          ...this.runningExercise,
          date:new Date(),
          duration:this.runningExercise.duration *(progress/100),
          calories:this.runningExercise.calories *(progress/100),
          state:'cancalled'
         })
      this.runningExercise=null;
      this.exerciseChanged.next(null);

    }
  getRunningExercise(){
    return {...this.runningExercise}
  }

  fetchCompletedOrCancelledExercise(){
  this.fbSub.push(this.db.collection('finishedExercise').valueChanges().subscribe((exercise:Exercise[])=>{
      this.exerciseFinishedChanged.next(exercise);
    }));
  }

  cancelSubscription(){
    this.fbSub.forEach(sub=>sub.unsubscribe());
  }
  private addDataToDatabase(exercise:Exercise){
  this.db.collection('finishedExercise').add(exercise);
  }

}
