import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Juan Gonzalez', email: "juangonzaleze04@gmail.com", symbol: 'H'},
  {position: 2, name: 'Deira Espinoza', email: "deiraespinoza@gmail.com", symbol: 'He'},
  {position: 3, name: 'Erika Gonzalez', email: "sergianys22@gmail.com", symbol: 'Li'},
  {position: 4, name: 'Lionel Enrique', email: "lionelEnrique@gmail.com", symbol: 'Be'},
  {position: 5, name: 'Lionel Andres', email: "LionelAndres@gmail.com", symbol: 'B'},
];

@Component({
  selector: 'app-table-cite-recent',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './table-cite-recent.component.html',
  styleUrl: './table-cite-recent.component.scss'
})
export class TableCiteRecentComponent {

  displayedColumns: string[] = ['position', 'name', 'email', 'symbol'];
  dataSource = ELEMENT_DATA;
}
