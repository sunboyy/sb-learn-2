import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum StorageLocation {
  Session,
  Local
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';

  isSignedIn = new BehaviorSubject<boolean>(this.getStorageLocation() !== undefined);

  private getStorageLocation(): StorageLocation {
    if (sessionStorage.getItem(this.ACCESS_TOKEN_KEY)) {
      return StorageLocation.Session;
    } else if (localStorage.getItem(this.ACCESS_TOKEN_KEY)) {
      return StorageLocation.Local;
    }
  }

  getAccessToken(): string {
    switch (this.getStorageLocation()) {
      case StorageLocation.Session:
        return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
      case StorageLocation.Local:
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
  }

  setAccessToken(accessToken: string, storageLocation: StorageLocation) {
    switch (storageLocation) {
      case StorageLocation.Session:
        sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        break;
      case StorageLocation.Local:
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        break;
    }
    this.isSignedIn.next(true);
  }

  destroy() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.isSignedIn.next(false);
  }
}
