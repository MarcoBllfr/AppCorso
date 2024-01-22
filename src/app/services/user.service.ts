import { Injectable } from '@angular/core';
import { Users } from '../model/users';
import { Observable, of, throwError } from 'rxjs';
import { MOCK_USERS } from '../mock/mock-users';

export const DEMO_USER_STORE = 'demo_user_store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:Users[] = [];
 
  constructor() {
    //creiamo la lista dei nostri messaggi presi dalla local storage 
    const stored: string|null =  localStorage.getItem(DEMO_USER_STORE);
    this.users = stored ? JSON.parse(stored):this.save(MOCK_USERS);
  }


  getAll(): Observable<Users[]>{
    return of(this.users);
  }

  get(id:number):Observable<Users>{
    const user = this.users.find(m => m.id === id);
    return user ? of(user):throwError(`Errore con l'id ${id} non trovato`);
  }

  add(user:Users): Observable<Users>{
    this.users.push(user);
    this.deleteFromLS();
    this.save(this.users);
    return of(user);
  }


  remove(id:number): Observable<void>{
    const userndex = this.users.findIndex(us => us.id === id);
    if(userndex !== -1){
      this.users.splice(userndex,1);
      this.deleteFromLS();
      this.save(this.users);
      return of(undefined);
    }
    return throwError("L'id del messaggio non esiste");
  }

  private save(messages:Users[]){
    localStorage.setItem(DEMO_USER_STORE,JSON.stringify(messages));
    return messages;
  }
  private deleteFromLS(){
    localStorage.removeItem(DEMO_USER_STORE);
   }

}
