import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  history: any[] = [];

  constructor(private storageService: StorageService) { }

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

}
