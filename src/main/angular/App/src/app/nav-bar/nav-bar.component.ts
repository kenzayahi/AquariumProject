import {Component, Input} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Validators} from "@angular/forms";
import {RoleEmploye} from "../model/employe";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input()
  RoleEmploye:any;

  isGestionnaire= false;
  isSimpleEmpoye= false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    if(this.RoleEmploye==RoleEmploye.gestionnaire){
      this.isGestionnaire=true;
    }else if(this.RoleEmploye==RoleEmploye.simpleEmploye){
      console.log(this.RoleEmploye);
      console.log(this.isSimpleEmpoye);
      this.isSimpleEmpoye=true;
      console.log(this.isSimpleEmpoye);

    }
  }
}
