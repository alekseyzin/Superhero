import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserCreate} from '../interfaces';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('expDate'))

    if (new Date() > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('heroToken')
  }

  login(user: User): Observable<any>{
    const fetchLogin$ = new Observable(observer => {

      setTimeout(() => {
        observer.next(1)
      }, 1000)
    })

    return fetchLogin$.pipe(
      tap(this.setToken)
    )
  }

  logout(): void {
    localStorage.removeItem('expDate')
    localStorage.removeItem('heroToken')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken():void {
    const expDate = new Date(new Date().getTime() + 3600 * 1000)

    localStorage.setItem('expDate', expDate.toString())
    localStorage.setItem('heroToken', new Date().getTime().toString())
  }

  registration(user: UserCreate): void {
    if (localStorage.users) {
      const usersInStoradge = JSON.parse(localStorage.users)

      localStorage.setItem('users', JSON.stringify([...usersInStoradge, user]))
    } else {
      localStorage.setItem('users', JSON.stringify([user]))
    }
  }
}
