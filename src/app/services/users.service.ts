import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Users } from "src/app/models/users";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsersApi(param: any): Observable<any> {
    const params = new HttpParams()
      .set("page", param.page.toString())
      .set("per_page", param.limit.toString());
    return this.httpClient.get<Users[]>(`https://reqres.in/api/users`, { params }).pipe(
      catchError((error: any) => {
        return throwError(() => error.error);
      })
    );
  }
}
