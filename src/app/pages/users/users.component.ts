import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersData: User[] | undefined

  constructor(private sUser: UserService) { }

  ngOnInit(): void {
    this.sUser.getAll().subscribe({
      next: (data) => {
        this.usersData = data
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
