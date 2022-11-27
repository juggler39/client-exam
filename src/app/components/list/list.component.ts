import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from '@components/edit-event/edit-event.component';
import { ApiService } from '@services/api.service';
import { IEvent } from '@model/event.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  events: IEvent[];
  isLoading = true;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.loadEvents().subscribe({
      next: (data) => { this.events = data; },
      error: (err) => console.error("Error Occured: " + err),
      complete: () => (this.isLoading = false)
    })
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(EditEventComponent,
      {
        data: {
          title: 'Add new event'
        },
        width: '480px',
      });
    dialogRef.afterClosed().subscribe((event: IEvent) => {
      if (event) {
        this.isLoading = true;
        const maxId = Math.max(...this.events.map(o => o.eventId));
        event.eventId = maxId + 1;
        this.apiService.addEvent(event).subscribe({
          next: (resp) => {
            if (resp.status == 200) {
              const event = resp.body;
              this.events.unshift(event);
              this.events = this.events.filter((f) => f.eventId != 0);
            }
          },
          error: (err) => console.error("Error Occured: " + err),
          complete: () => (this.isLoading = false)
        });
      }
    });
  }

  editEvent(event: IEvent): void {
    const dialogRef = this.dialog.open(EditEventComponent,
      {
        data: {
          title: `Edit event ${event.eventId}`,
          event: event
        },
        width: '480px',
      });

    dialogRef.afterClosed().subscribe((event: IEvent) => {
      if (event) this.isLoading = true;
      this.apiService.updateEvent(event).subscribe({
        next: (resp) => {
          if (resp.status == 200) {
            const event = resp.body;
            const index = this.events.findIndex(e => e.eventId === event.eventId);
            this.events[index] = event;
            this.events = this.events.filter((f) => f.eventId != 0);
          }
        },
        error: (err) => console.error("Error Occured: " + err),
        complete: () => (this.isLoading = false)
      });
    });
  }

  removeEvent(eventId: string) {
    this.isLoading = true;
    this.apiService.deleteEvent(eventId).subscribe({
      next: (resp) => {
        if (resp.status == 200) {
          const deletedEmpId = resp.body;
          this.events = this.events.filter((f) => f.eventId != deletedEmpId);
        }
      },
      error: (err) => console.error("Error Occured: " + err),
      complete: () => (this.isLoading = false)
    }
    );
  }
}
