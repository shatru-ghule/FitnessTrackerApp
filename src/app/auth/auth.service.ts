import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { ToastrService } from 'ngx-toastr';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated=false;
  constructor(private router: Router,
     private afAuth: AngularFireAuth,
     private tosterService:ToastrService,
     private trainingService:TrainingService,
     private uiService:UIService
     ) {}

  registerUser(authData: AuthData) {
    this.uiService.loadingstateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingstateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingstateChanged.next(false);
        this.tosterService.error(error.message,null);

      });
  }

  login(authData: AuthData) {
    this.uiService.loadingstateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingstateChanged.next(false);
        this.tosterService.success("Login Successfully!.");
      })
      .catch((error) => {
        this.uiService.loadingstateChanged.next(false);
        this.tosterService.error(error.message,null);
        console.log(error);

      });
  }

    initAuthListener(){
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.isAuthenticated=true;
        this.authChange.next(true);
        this.router.navigate(["/training"]);
      }else{
        this.trainingService.cancelSubscription();
        this.authChange.next(false);
        this.isAuthenticated=false;
        this.router.navigate(["/login"]);
      }
    })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.tosterService.success("Logout SuccessFully!.Come Soon:)")
  }


  isAuth() {
    return this.isAuthenticated
  }

}
