import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlgorithmService } from '../algorithm.service';
import { Algorithm } from '../model/algorithm';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  allAlgorithms: Algorithm[] = [];
  algo1Selected: Algorithm = {
    id: 0,
    description: "",
    image: "",
    name: "Select Algorithm"
  };
  algo2Selected: Algorithm = {
    id: 0,
    description: "",
    image: "",
    name: "Select Algorithm"
  };
  file: File | null = null;
  algo1Performance: number;
  algo2Performance: number;
  showPerfomance: boolean = false;
  loading: boolean = false;
  label: string = "Choose File";

  constructor(private algoService: AlgorithmService, private toastr: ToastrService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.allAlgorithms = this.algoService.getAllAlgorithms();
  }

  changeAlgo1Selected(algo: Algorithm) {
    this.algo1Selected = algo;
    this.showPerfomance = false;
  }

  changeAlgo2Selected(algo: Algorithm) {
    this.algo2Selected = algo;
    this.showPerfomance = false;
  }

  async getFileDetails(event: any) {
    this.file = event.target.files[0];
    if (this.file != null) {
      this.label = this.file.name;
      if (this.file.type != "text/plain") {
        this.toastr.error("Please upload the file with .txt extension");
      }
    }
  }

  async compareAlgorithm() {
    if (this.algo1Selected.name == this.algo2Selected.name || this.algo1Selected.name == "Select Algorithm" || this.algo2Selected.name == "Select Algorithm") {
      this.toastr.error("Please select two diiferent valid Algorithm");
    } else {
      let counter = 0;
      if (this.file == null) {
        this.toastr.error("Please upload a text file");
      } else {
        this.showPerfomance = false;
        this.loading = true;
        this.ref.detectChanges();
        let content = await this.readFileContent(this.file);
        let t0 = performance.now();
        try {
          await this.algoService.encrypt(this.algo1Selected.id, content, "25");
          counter++;
        } catch (error) {
          this.toastr.error(error, "Error");
        }
        let t1 = performance.now();
        this.algo1Performance = t1 - t0;
        let t2 = performance.now();
        try {
          await this.algoService.encrypt(this.algo2Selected.id, content, "25");
          counter++;
        } catch (error) {
          this.toastr.error(error, "Error");
        }
        let t3 = performance.now();
        this.algo2Performance = t3 - t2;
        if (counter == 2) {
          this.showPerfomance = true;
        }
      }
    }
    this.loading = false;
  }

  //https://stackoverflow.com/questions/47581687/angular-read-a-file-and-parse-its-content
  async readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        resolve('');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result != null) {
          const text = reader.result.toString();
          resolve(text.trim());
        } else {
          resolve('');
        }

      };
      reader.readAsText(file);
    });
  }

}
