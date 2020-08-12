import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { TrainingRoutingModule } from './trainingRouting.module';


@NgModule({
  declarations:[
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports:[
    SharedModule,
    TrainingRoutingModule
  ],
  entryComponents:[StopTrainingComponent]

})
export class TrainingModule{

}
