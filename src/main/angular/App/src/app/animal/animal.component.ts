import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  listAnimaux:any;
//injecter le service httpClient
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onGetAnimaux() {
    this.httpClient.get("http://localhost:8080/animaux")
      .subscribe(data=>{
        this.listAnimaux=data;
      },error => {
        console.log("error")
      })
  }
}
