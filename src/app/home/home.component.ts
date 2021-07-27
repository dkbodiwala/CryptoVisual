import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  src: string = "";
  title: string = "";
  description: string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.src = "assets/img/crypto.jpg";
    this.title = "Welome to CryptoVisual Web application";
    this.description = "Cryptography is an essential way to provide security to data transmitted over networks. It has been incorporated with every online transaction present today. However, students often find it difficult to understand these complex algorithms. This web application helps students to learn these complex cryptography concepts. The web application will visualize certain encryption algorithms step by step. Students can use these algorithms to encrypt messages by providing plaintext and key. Moreover, they can discover the specific steps of encryption algorithms, compare algorithms in terms of efficiency, and explore an algorithm in depth.";
  }
}
