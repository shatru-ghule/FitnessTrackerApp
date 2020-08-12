import { NgModule } from '@angular/core';
import {AngularFireAuthModule  } from 'angularfire2/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './authRouting.module';

import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
   declarations:[ SingupComponent,LoginComponent],
   imports:[
     ReactiveFormsModule,
     AngularFireAuthModule,
     SharedModule,
     AuthRoutingModule

   ]
})
export class AuthModule {

}
