import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { CalendarDefaultOptions } from '../../../utils/calendarOptions';
import { CardAppointmentComponent } from '../components/card-appointment/card-appointment.component';
import { TIME_AVAILABLE, CONFIG_MODAL } from '../../../const';
import { Cite, ResponseCite, ResponseCiteUpdate } from '../../../models/Cite.model';
import { DateClickArg } from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { CiteInfoComponent } from '../../../modals/cite-info/cite-info.component';
import { ConfirmComponent } from '../../../modals/confirm/confirm.component';
import { AddCiteComponent } from '../../../modals/add-cite/add-cite.component';
import { CommonModule } from '@angular/common';
import { CitesService } from '../../../services/cites.service';
import { STATUS_CITE } from '../../../enums/cite.enum';
import { map } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.model';
import { AlertService } from '../../../services/alert.service';
import { TitleSectionComponent } from '../components/title-section/title-section.component';

interface responseCite { 
  confirmed: boolean,
  reason_cancel: string
}

@Component({
  selector: 'app-calendary',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    FullCalendarModule,
    CardAppointmentComponent,
    CommonModule,
    TitleSectionComponent
  ],
  templateUrl: './calendary.component.html',
  styleUrl: './calendary.component.scss'
})

export class CalendaryComponent {
  
  private dialog = inject(MatDialog)
  private citesService = inject(CitesService)
  private authService = inject(AuthService)
  private alertService = inject(AlertService)

  TIME_AVAILABLE = TIME_AVAILABLE;
  selected_date: string = '';
  renderListCite: Cite[] = [];
  userInfo: User = this.authService.dataUser!;

  events: Cite[] = [];

  calendarOptions: CalendarOptions = {
    ...CalendarDefaultOptions,
    dateClick: (arg: DateClickArg) => this.handleDateSelect(arg),
    eventClick: (arg: EventClickArg) => {
      console.log("click, evenet", arg)
    },
  };

  ngOnInit() {

    const today = new Date();
    const todayString = today.toLocaleDateString('en-CA').slice(0, 10);

    if (today.getDay() === 6 || today.getDay() === 0) {
      this.selected_date = '';
    } else {
      this.selected_date = todayString;
    }

    this.getAllCite();
    this.calendarOptions.events = this.events.slice();
  }

  getAllCite() {
    this.citesService.getCites().pipe(
      map((response: ResponseCite) => {
        if (!this.userInfo.isAdmin) {
          return response.cites.filter(cite => cite.status === STATUS_CITE.APPROVED);
        }
        return response.cites;
      }),
      map((response: Cite[]) =>
        response.map((cite) => ({
          ...cite,
          backgroundColor: this.getStatusColor(cite.status),
        }))
      )
    ).subscribe({
      next: (response: Cite[]) => {
        this.events = response
        this.updateRenderList(this.selected_date);
        this.calendarOptions.events = this.events.slice();
      },
      error: (error: any) => {
        console.log("click, evenet", error)
      }
    })
  }

  handleDateSelect(selectInfo: DateClickArg) {
    this.selected_date = selectInfo.dateStr;
    const activeElements = document.querySelectorAll('.active-day');
    activeElements.forEach(element => element.classList.remove('active-day'));
    const selectedElement = document.querySelector(`[data-date="${this.selected_date}"]`);

    if (selectedElement) {
      selectedElement.classList.add('active-day');
    }
    this.updateRenderList(this.selected_date);

  }

  eventFindByDate(time: string) {
    return this.renderListCite.find((item: Cite) => item.date.split('T')[1] === time);
  }

  updateRenderList(date: string = this.selected_date ) {
    const dateList = this.events.filter((item: Cite) => date == item.date.split('T')[0]);
    this.renderListCite = dateList;
  }

  handleConfirmAction({
    message,
    actionType,
    idCite
  }: {
    message: string,
    actionType: 'confirm' | 'cancel',
    idCite: string | undefined
  }) {
    if (idCite){ 
      const dialogRef = this.dialog.open(ConfirmComponent, {
        ...CONFIG_MODAL,
        width: '420px',
        data: {
          text: message,
          actionType,
        }
      });
  
      dialogRef.afterClosed().subscribe((result: responseCite) => {
        console.log("result", result)
        if (result) {

          const status = actionType === 'confirm' ? STATUS_CITE.APPROVED : STATUS_CITE.CANCELLED;
          const message = actionType === 'confirm' ? 'Cite accepted successfully!' : 'Cite cancelled successfully!';
      
          this.updateStatusCite(status, idCite, message, result.reason_cancel);
          /* this.getAllCite(); */
        }
      });
    }
  }

  openInfoModal(time: string) {
    const cite = this.eventFindByDate(time);

    if (this.userInfo?._id != cite?.user.userId && !this.userInfo?.isAdmin) {
      return
    }

    this.dialog.open(CiteInfoComponent, {
      ...CONFIG_MODAL,
      width: '520px',
      data: cite
    });
  }


  openAddCite(time: string) {

    const dialogRef = this.dialog.open(AddCiteComponent, {
      ...CONFIG_MODAL,
      width: '380px',
      data: {
        time,
        date: this.selected_date
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log("result", result);
      if (result) {
        this.getAllCite();
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case STATUS_CITE.PENDING:
        return '#2196F375';
      case STATUS_CITE.APPROVED:
        return '#4caf5075';
      case STATUS_CITE.CANCELLED:
        return '#f4433675';
        case STATUS_CITE.FINISHED:
          return '#f4953675';
      default:
        return '#cccccc';
    }
  }


  updateStatusCite(status: string, id: string, message: string, reason_cancel: string) {

    this.citesService.postUpdateCite({ status, reason_cancel }, id).subscribe({
      next: (response: ResponseCiteUpdate ) => {
        const index = this.events.findIndex((cite: Cite) => cite._id === id);
        const {status} = response.data

        if (index !== -1) {
          this.events[index].status = status; 
          this.events[index].backgroundColor = this.getStatusColor(status),
          this.alertService.showAlert({ message });
          this.calendarOptions.events = this.events.slice();
        } else {
          console.error('Cite not found');
          this.alertService.showAlert({ message: "Cite not found" });
        }
      },
      error: (error: ErrorCallback) => {
        console.log("error, error", error)
      }
    })
  }


}
