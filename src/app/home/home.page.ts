import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  baseCurrency = 'USD';
  targetCurrency = 'EUR';
  amount: number = 1;
  result: number | null = null;
  currencies: string[] = [];

  constructor(private http: HttpClient, private storageService: StorageService) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    const url = `https://v6.exchangerate-api.com/v6/082f3e4425e88955be41e81f/codes`;

    this.http.get(url).subscribe(
      (data: any) => {
        if (data.supported_codes) {
          this.currencies = data.supported_codes.map((code: any) => code[0]);
        } else {
          alert('Não foi possível carregar a lista de moedas.');
        }
      },
      (error) => {
        console.error('Erro ao acessar a API:', error);
        alert('Não foi possível acessar a API. Verifique sua conexão ou a chave de API.');
      }
    );
  }

  convert() {
    const url = `https://v6.exchangerate-api.com/v6/082f3e4425e88955be41e81f/latest/${this.baseCurrency}`;

    this.http.get(url).subscribe(
      (data: any) => {
        const rate = data.conversion_rates?.[this.targetCurrency];
        if (!rate) {
          alert('Taxa de câmbio não encontrada para as moedas selecionadas.');
          return;
        }

        this.result = this.amount * rate;

        // Salvar no histórico
        const conversion = {
          base: this.baseCurrency,
          target: this.targetCurrency,
          amount: this.amount,
          result: this.result,
          date: new Date(),
        };

        this.storageService.get('history').then((history: any[]) => {
          history = history || [];
          history.push(conversion);
          this.storageService.set('history', history);
        });
      },
      (error) => {
        console.error('Erro ao acessar a API:', error);
        alert('Não foi possível acessar a API. Verifique sua conexão ou a chave de API.');
      }
    );
  }

  swapCurrencies() {
    [this.baseCurrency, this.targetCurrency] = [this.targetCurrency, this.baseCurrency];
  }
}
