import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlgorithmService } from '../algorithm.service';
import { Output } from '../model/output';

@Component({
  selector: 'app-algorithm-detail',
  templateUrl: './algorithm-detail.component.html',
  styleUrls: ['./algorithm-detail.component.css']
})
export class AlgorithmDetailComponent implements OnInit {

  id: number = 0;
  image: string = '';
  title: string = '';
  description: string = '';
  plainText: string = '';
  encryptionKey: string = '';
  showEncryptedText: boolean = false;
  encryptedValue: Output;
  caesarCipherAllKeys: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

  constructor(private route: ActivatedRoute, private algoService: AlgorithmService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    
    let algorithmData = this.algoService.getAlgorithm(this.id);
      
    this.image = algorithmData.image;
    this.title = algorithmData.name;
    this.description = algorithmData.description;
  }

  encrypt() {
    this.showEncryptedText = false;

    if(this.encryptionKey != "" && this.plainText != "") {    
      try {
        this.encryptedValue = this.algoService.encrypt(this.id, this.plainText, this.encryptionKey);
        this.showEncryptedText = true;
      } catch (error) {
        this.toastr.error(error,"Error");
      }
    }
  }


}
