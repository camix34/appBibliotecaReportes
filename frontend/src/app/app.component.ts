import { Component, HostListener, OnInit } from '@angular/core';


declare var $: any;
declare function LOGININITTEMPLATE([]):any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  ngOnInit():void{
    setTimeout(()=>{
      LOGININITTEMPLATE($);
    },50);
  }

 
}
