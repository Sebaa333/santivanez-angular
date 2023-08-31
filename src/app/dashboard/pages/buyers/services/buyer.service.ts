import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Buyer, CreateBuyerPayload } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BuyerService {
  private _buyers$ = new BehaviorSubject<Buyer[]>([]);
  private readonly baseUrl = environment.baseApiUrl + '/buyers';
  public buyers$ = this._buyers$.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadBuyers(): void {
    this.httpClient.get<Buyer[]>(this.baseUrl).subscribe({
      next: (buyers) => {
        this._buyers$.next(buyers); 
      },
      error: () => {
       
      },
    });
  }

  createBuyer(payload: CreateBuyerPayload, afterCreate?: () => void): void {
    this.httpClient.post<Buyer>(this.baseUrl, payload).subscribe({
      next: () => {
        this.loadBuyers(); 
        if (afterCreate) afterCreate();
      },
      error: () => {
      },
    });
  }

  deleteBuyerById(id: number): void {
    this.httpClient.delete(this.baseUrl + '/' + id).subscribe({
      next: () => {
        this.loadBuyers(); 
      },
      error: () => {
      },
    });
  }

  clearBuyers(): void {
    this._buyers$.next([]);
  }
}