import { Component, OnInit, inject } from '@angular/core';
import { TitleSectionComponent } from '../components/title-section/title-section.component';
import { AsyncPipe, CommonModule, DatePipe, JsonPipe } from '@angular/common';
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

@Component({
  selector: 'app-confirmed',
  standalone: true,
  imports: [
    TitleSectionComponent,
    CommonModule,
    CardCiteComponent,
    CiteDetailsComponent,
    AsyncPipe,
    DatePipe,
    JsonPipe,
    MatIconModule
  ],
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.scss'
})

export class ConfirmedComponent {

  citeService = inject(CitesService);
  alertService = inject(AlertService);
  groupedCites: GroupedCite[] = []
  isAscending: boolean = true;

  userInfo: User | undefined = inject(AuthService).getUser();
  loading: boolean = false;

  selectedCite: Cite | null = null;

  ngOnInit(): void {
    this.getAllCites()
  }

  getAllCites() {
    if (this.userInfo) {
    this.loading = true;
     this.citeService.getCites().pipe(
        map(response => {
          const result = response.cites.filter((cite: Cite) => cite.status === STATUS_CITE.APPROVED)
          return result
        }),
        map(cites => groupCitesByDate(cites))
      ).subscribe(data => {
        this.groupedCites = this.oderDateCite(data)
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

  onChangeCite(){ 
    console.log("change")
  }

  selectedCiteInfo(cite: Cite){ 
    this.selectedCite = cite;
  }

}
