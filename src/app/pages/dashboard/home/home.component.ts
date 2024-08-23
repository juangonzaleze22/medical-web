import { Component, OnInit, ViewChild } from '@angular/core';
import { CardInfoGraphComponent } from "../components/card-info-graph/card-info-graph.component";
import { TitleSectionComponent } from '../components/title-section/title-section.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartEvent, ChartType, scales } from 'chart.js';

import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { TableCiteRecentComponent } from "../components/table-cite-recent/table-cite-recent.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardInfoGraphComponent,
    TitleSectionComponent,
    BaseChartDirective,
    CommonModule,
    TableCiteRecentComponent,
    TableCiteRecentComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [
      'Pendiente',
      'Aceptadas',
      'Rechazadas',
      'Finalizadas',
    ],
    datasets: [
      {
        data: [ 350, 450, 100, 22 ], 
        backgroundColor: [
          '#2196F375',
          '#4caf5075', 
          '#f4433675', 
          '#f4953675'
        ],
      },
    ],
  };

  public optionsDoughnutGraph = { 
      plugins: {
        legend: {
          display: false,
        }
      },
  }


  labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  dataBar = {
    labels: this.labels,
    datasets: [{
      label: 'Citas por mes',
      data: [65, 59, 22, 59, 15, 7, 65, 100, 59, 65, 12, 16 ],
      backgroundColor: [
        '#177ee5',
      ],
     
    }],
  };
}
