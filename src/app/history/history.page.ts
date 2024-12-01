import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  history: any[] = [];

  constructor(private storageService: StorageService, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadHistory();
  }

  async loadHistory() {
    const savedHistory = await this.storageService.get('history');
    this.history = savedHistory || [];
  }

  async clearHistory() {
    await this.storageService.set('history', []);
    this.history = [];
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

}
