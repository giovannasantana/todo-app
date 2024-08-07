import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Task } from 'src/model/task.model';

interface TaskResponse {
  todos: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http.get<TaskResponse>(`${this.apiUrl}/todo/todos`, {
      headers,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          console.log('Token recebido:', response);
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    console.log("cheguei no addTask service", task)
    return this.http.post<Task>(`${this.apiUrl}/todo/create`, task);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
