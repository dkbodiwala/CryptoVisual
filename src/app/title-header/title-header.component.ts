import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.css']
})
export class TitleHeaderComponent implements OnInit {

  @Input()
  image: String ='';

  @Input()
  title: String = '';

  @Input()
  description: String = '';

  constructor() { }

  ngOnInit(): void {
  }

}
