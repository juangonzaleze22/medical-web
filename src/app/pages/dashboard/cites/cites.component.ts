import { Component, OnInit, inject } from '@angular/core';
import { TitleSectionComponent } from '../components/title-section/title-section.component';
import { CardCiteComponent } from "../components/card-cite/card-cite.component";
import { CitesService } from '../../../services/cites.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.model';
import {  } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Cite, GroupedCite } from '../../../models/Cite.model';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { CiteDetailsComponent } from '../components/cite-details/cite-details.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cites',
  standalone: true,
  imports: [
    TitleSectionComponent,
    CardCiteComponent,
    AsyncPipe,
    JsonPipe,
    CommonModule,
    CiteDetailsComponent,
    MatIconModule
  ],
  templateUrl: './cites.component.html',
  styleUrl: './cites.component.scss'
})
export class CitesComponent implements OnInit {

  citeService = inject(CitesService);
  alertService = inject(AlertService);
  groupedCites: GroupedCite[] = []

  userInfo: User | undefined = inject(AuthService).dataUser;
  loading: boolean = false;
  isAscending: boolean = true;

  selectedCite: Cite | null = null;

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    /* if (this.userInfo) {
    this.loading = true;
    this.citeService.getCitesByUser(this.userInfo._id).pipe(
        map(cites => groupCitesByDate(cites.data))
      ).subscribe(data => {
        this.groupedCites = this.oderDateCite(data)
          this.loading = false;
      });
    } */
  }

  selectedCiteInfo(cite: Cite){ 
    this.selectedCite = cite;
  }

  onButtonClicked($event: boolean){ 
    this.isAscending = !this.isAscending;
    this.groupedCites = this.oderDateCite(this.groupedCites);
  }

  private oderDateCite(cites: GroupedCite[]) {
    return cites.sort((a, b) => {
      const fechaA = new Date(a.date);
      const fechaB = new Date(b.date);
      return  this.isAscending ?  fechaA.getTime() - fechaB.getTime() :  fechaB.getTime() - fechaA.getTime()
    });
  }

}
