import { Component, OnInit, Input } from '@angular/core';

//https://valor-software.com/ng2-charts/#GeneralInfo
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-graph-doughnut',
  templateUrl: './graph-doughnut.component.html',
  styles: []
})
export class GraphDoughnutComponent implements OnInit {

  @Input()
  public chartLabels: Label[] = [];
  
  @Input()
  public chartData: MultiDataSet = [];

  @Input()
  public chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
