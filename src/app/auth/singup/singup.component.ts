import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit ,OnDestroy{
  maxDate;
  isLoading=false;
  private loadSub:Subscription;
  constructor(private authService:AuthService,private uiService:UIService) { }

  ngOnInit() {
    this.loadSub=this.uiService.loadingstateChanged.subscribe(isLoading=>{
      this.isLoading=isLoading;
    })
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }
  onSubmit(form:NgForm){
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.password
    })
  }
  ngOnDestroy(){
   if(this.loadSub){
    this.loadSub.unsubscribe();
   }
  }

}
