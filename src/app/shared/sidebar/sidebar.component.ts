import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public readonly sideBar: SidebarService,
    public readonly userService: UserService
  ) { }

  ngOnInit() {
  }

}
