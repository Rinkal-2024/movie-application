import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTFhYzYyMTljNGZhOTY1OTQ2YjM0YTVhNzRmZTZjZCIsInN1YiI6IjY2MjlmOTlhNTBmN2NhMDBiNmM4NmY1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ey5um5XSQF2KFYfrKGOgrFL0Vw6DbDHJZqq55eJWxyw';

  private apiUrl = 'https://your-authentication-api-url.com';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }


  getAccessToken(): string {
    return this.accessToken;
  }
}
