import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeProviderService {
  private userTypeSubject = new BehaviorSubject<string>('user');
  public userType$: Observable<string> = this.userTypeSubject.asObservable();

  updateUserType(newValue: string): void {
    this.userTypeSubject.next(newValue);
  }

  get currentUserType(): string {
    return this.userTypeSubject.value;
  }
}
