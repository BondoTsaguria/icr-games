import { Injectable } from '@angular/core';
import { UserData } from '../../shared/interfaces/user-data.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedInUserUrl = 'http://localhost:3000/loggedInUsers';

  constructor(private http: HttpClient) {}

  // Method to add a new user
  addUser(userData: UserData): Observable<UserData> {
    return this.http.post<UserData>(this.apiUrl, userData);
  }

  // Method to get the list of registered users
  getRegisteredUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl);
  }

  // Method to add a new logged-in user
  addLoggedInUser(userData: UserData): Observable<UserData> {
    const loggedInUserData = {
      ...userData,
      balance: 0,
      cryptocurrencies: [],
      mycurrencies: [],
    };
    return this.http.post<UserData>(this.loggedInUserUrl, loggedInUserData);
  }

  // Method to get the logged-in user
  getLoggedInUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.loggedInUserUrl);
  }

  // Method to delete a registered user
  deleteUser(id: number | undefined): Observable<UserData> {
    const userUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<UserData>(userUrl);
  }

  deleteLoggedInUser(id: number | undefined): Observable<UserData> {
    const userUrl = `${this.loggedInUserUrl}/${id}`;
    return this.http.delete<UserData>(userUrl);
  }

  updateUser(
    id: number | undefined,
    userData: Partial<UserData>
  ): Observable<UserData> {
    const userUrl = `${this.apiUrl}/${id}`;
    return this.http.patch<UserData>(userUrl, userData);
  }

  updateLoggedInUser(
    id: number | undefined,
    userData: Partial<UserData>
  ): Observable<UserData> {
    const userUrl = `${this.loggedInUserUrl}/${id}`;
    return this.http.patch<UserData>(userUrl, userData);
  }
}
