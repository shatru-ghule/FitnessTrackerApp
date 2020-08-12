import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubcription: Subscription;
  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.authSubcription = this.authservice.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  onTogglesidenav() {
    this.toggleSidenav.emit();
  }
  onLogout(){
    this.authservice.logout();
  }
  ngOnDestroy() {
    if(this.authSubcription){
      this.authSubcription.unsubscribe();
    }
  }
}
