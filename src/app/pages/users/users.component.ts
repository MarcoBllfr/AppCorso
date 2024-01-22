import { Component } from '@angular/core';
import { Users } from '../../model/users';
import { TitleService } from '../../services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CreateUserDialogComponent } from '../../components/create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: Users[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly titleService : TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.title.next('Lista utenti');
    this.userService.getAll()
      .pipe(
        map((users: Users[]) => this.users = users)
      )
      .subscribe();
  }

  create(): void {
    this.dialog.open(CreateUserDialogComponent)
      .afterClosed()
      .pipe(
        switchMap((user?: Users) => user ? this.userService.add(user) : new Observable(sub => sub.complete()))
      )
      .subscribe(
        (message: any) => console.log(`Messaggio creato: ${message.id}`)
      );
  }

}
