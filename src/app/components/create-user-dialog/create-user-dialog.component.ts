import { Component, OnInit } from '@angular/core';
import { Users } from '../../model/users';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent implements OnInit {

  user:Users;

  constructor(
    private readonly ref: MatDialogRef<CreateUserDialogComponent>
  ){
    this.user={
      id: new Date().getTime(),
      nome:'',
      descrizione:''
    };
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    close():void{
      this.ref.close(this.user);
    }

}