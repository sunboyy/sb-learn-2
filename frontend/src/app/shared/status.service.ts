import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface Status {
  allowSelfRegistration: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private status = new BehaviorSubject<Status>(undefined);

  constructor(private api: ApiService) {}

  updateStatus(): void {
    this.api.get<Status>('status').subscribe((res) => {
      this.status.next(res);
    });
  }

  getStatus(): Observable<Status> {
    if (!this.status.getValue()) {
      this.updateStatus();
    }
    return this.status.pipe(filter((status) => status !== undefined));
  }
}
