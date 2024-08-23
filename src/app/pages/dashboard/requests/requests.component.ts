import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { TitleSectionComponent } from '../components/title-section/title-section.component';
import { AsyncPipe, CommonModule, DatePipe, JsonPipe, ViewportScroller } from '@angular/common';
import { CitesService } from '../../../services/cites.service';
import { AlertService } from '../../../services/alert.service';
import { Cite, GroupedCite } from '../../../models/Cite.model';
import {  map } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.model';
import { CardCiteComponent } from '../components/card-cite/card-cite.component';
import { CiteDetailsComponent } from '../components/cite-details/cite-details.component';
import { MatIconModule } from '@angular/material/icon';
import { groupCitesByDate } from '../../../utils/oderCiteByDate';
import { STATUS_CITE } from '../../../enums/cite.enum';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { searchInput } from '../../../utils/serchInput';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface optionsSelectStatusCite { 
  name: string,
  value: string
}

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    TitleSectionComponent,
    CommonModule,
    CardCiteComponent,
    CiteDetailsComponent,
    AsyncPipe,
    DatePipe,
    JsonPipe,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})

export class RequestsComponent implements OnInit{

  citeService = inject(CitesService);
  alertService = inject(AlertService);
  groupedCites: GroupedCite[] = []
  FilteredGroupedCite: GroupedCite[] = []
  isAscending: boolean = true;

  userInfo: User | undefined = inject(AuthService).getUser();
  renderer = inject(Renderer2);
  loading: boolean = false;

  status_cite: optionsSelectStatusCite[] = [
    {
      value:   STATUS_CITE.PENDING,
      name: 'Pendiente'
    },
    {
      value:   STATUS_CITE.CANCELLED,
      name: 'Rechazadas'
    },
    {
      value:   STATUS_CITE.APPROVED,
      name: 'Confirmadas'
    },
    {
      value:   STATUS_CITE.FINISHED,
      name: 'Finalizadas'
    },
  ]

  selectedTypeCite: string = STATUS_CITE.PENDING;
  selectedCite: Cite | null = null;
  searchText: string = '';

  ngOnInit(): void {
    this.getCities(this.selectedTypeCite)
  }

  getCities(typeCite: string = '') {
    if (this.userInfo) {
    this.loading = true;

    const getCities = this.userInfo.isAdmin ? 
                      this.citeService.getCites(typeCite) : 
                      this.citeService.getCitesByUser(this.userInfo._id, this.selectedTypeCite); 

     getCities.pipe(
        map(result => groupCitesByDate(result.cites))
      ).subscribe(data => {
        this.groupedCites = this.oderDateCite(data)
        this.searchData('')
        console.log(this.groupedCites[0])
          this.loading = false;
      });
    }
  }

  private oderDateCite(cites: GroupedCite[]) {
    return cites.sort((a, b) => {
      const fechaA = new Date(a.date);
      const fechaB = new Date(b.date);
      return  this.isAscending ?  fechaA.getTime() - fechaB.getTime() :  fechaB.getTime() - fechaA.getTime()
    });
  }

  selectedCiteInfo(cite: Cite){ 
    this.selectedCite = cite;
    const dashboardContent = document.querySelector('.dashboard__content');
    if (dashboardContent){
      dashboardContent.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }

  onButtonClicked($event: boolean){ 
    this.isAscending = !this.isAscending;
    this.FilteredGroupedCite = this.oderDateCite(this.FilteredGroupedCite);
  }

  onChangeCite(){ 
    this.getCities(this.selectedTypeCite);
    this.selectedCite = null;
  }

  onChangeTypeCite($event: MatButtonToggleChange){ 
    this.selectedCite = null;
    this.selectedTypeCite = $event.value;
    this.getCities(this.selectedTypeCite);
  
  }

  searchData(searchText: string) {
    this.FilteredGroupedCite =  searchInput(searchText, this.oderDateCite(this.groupedCites));
  }

}
