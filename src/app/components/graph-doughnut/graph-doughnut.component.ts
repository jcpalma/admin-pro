import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

//https://valor-software.com/ng2-charts/#GeneralInfo
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, BaseChartDirective, } from 'ng2-charts';


@Component({
  selector: 'app-graph-doughnut',
  templateUrl: './graph-doughnut.component.html',
  styles: []
})
export class GraphDoughnutComponent implements OnInit, AfterViewInit {


  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    // onResize: this.resize
  };

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;


  @Input()
  public chartLabels: Label[] = [];

  @Input()
  public chartData: MultiDataSet = [];

  @Input()
  public chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

  resize(chart: Chart) {
    if (chart.width <= 305) {
      chart.options.legend.display = false;
    } else {
      chart.options.legend.display = true;
    }
  }

  ngAfterViewInit(): void {
    // console.log(this.chart);
  }

}
