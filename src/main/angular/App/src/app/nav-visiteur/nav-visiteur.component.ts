import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-visiteur',
  templateUrl: './nav-visiteur.component.html',
  styleUrls: ['./nav-visiteur.component.css']
})
export class NavVisiteurComponent implements OnInit {

  @Output()
  private disconnectEvent=new EventEmitter<boolean>();

  @Input()
  isVisiteur:boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private route:Router) {}
  ngOnInit() {
    this.route.navigate(['']);
  }

  desconnect() {
    this.disconnectEvent.emit(true);
  }
}
