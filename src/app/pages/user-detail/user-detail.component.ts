import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Users } from '../../model/users';
import { UserService } from '../../services/user.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
user?:Users;


constructor(
  private readonly route: ActivatedRoute,
  private readonly userService: UserService,
  private readonly router : Router,
  private readonly titleService : TitleService
){}

ngOnInit(): void {
  //recuperiamo l'id (lo mappiamo)
  this.route.params.pipe(
    switchMap(params => this.userService.get(+params['id'])),
    catchError(err =>{
      this.router.navigate(['/']);
      alert(err);
      throw err;
    }),
    map((user: Users) => {
      this.user = user
      this.titleService.title.next(`Info utente: ${this.user?.nome}`);
    })
  ).subscribe();
  
}

delete(user:Users):void{
  this.userService.remove(user.id).subscribe(()=>{
    console.log(`${user.nome} rimosso!`);
    this.router.navigate(['/']);
  },
  err => console.error(err));
}

}
