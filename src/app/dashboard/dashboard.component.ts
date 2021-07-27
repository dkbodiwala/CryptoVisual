import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlgorithmService } from '../algorithm.service';
import { Algorithm } from '../model/algorithm';

@Component({
  selector: 'app-algorithm',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allAlgorithms: Algorithm[]= [];

  constructor(private algoService: AlgorithmService, private router: Router) { }

  ngOnInit(): void {
    this.allAlgorithms = this.algoService.getAllAlgorithms();
  }

  goToDetail(algo: Algorithm){
    this.router.navigateByUrl(`/algorithm/${algo.id}`);
  }

}
