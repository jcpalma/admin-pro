import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {SettingsService} from '../../services/service.index';


@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor(public settingsService: SettingsService) {

  }

  ngOnInit() {
    this.settingsService.aplicarColor(this.settingsService.ajuste.tema);
  }

  cambiarColor(color: string) {
    this.settingsService.aplicarColor(color);
  }



}
