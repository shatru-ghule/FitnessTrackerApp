import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { AuthService } from "../auth.service";
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit ,OnDestroy {
  loginForm: FormGroup;
  isLoading=false;
 private loadingSub:Subscription;
  constructor(private authService: AuthService,private uiService:UIService) {}

  ngOnInit() {
    this.loadingSub= this.uiService.loadingstateChanged.subscribe(isloading=>{
      this.isLoading=isloading;
    })
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
  ngOnDestroy(){
    if(this.loadingSub){
      this.loadingSub.unsubscribe();
    }
  }
}
