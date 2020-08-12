import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UIService{
  loadingstateChanged=new Subject<boolean>();
  constructor(){}

}
