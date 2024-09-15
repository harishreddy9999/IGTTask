// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://gorest.co.in/public-api/users';
  private usersList: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

//   getUsers(params?: any): Observable<any> {
//     return this.http.get(this.apiUrl, { params });
//   }
  // Fetch users with pagination, search, filter, sort
  getUsersListApi(page: number = 1, limit: number = 10, query?: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    if (query?.search) params = params.set('name', query.search);
    if (query?.gender) params = params.set('gender', query.gender);
    if (query?.status) params = params.set('status', query.status);
    if (query?.sortField && query?.sortDirection) {
      params = params.set('sort', '${query.sortField}:${query.sortDirection}');
    }
    return this.http.get(this.apiUrl, { params });
  }

  setUsersList(data:any) {
    this.usersList.next(data);
  }
  getUsersList() {
    
    return this.usersList.asObservable();
  }
}