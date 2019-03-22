import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string = 'http://localhost:9000';

  constructor(private http:HttpClient) { }

  fetchPaginatedRestaurantsData(page: number, size: number=10){
    return this.http.get(this.baseUrl+'/restaurants/page/'+page+'/size/'+size);
  }

  fetchCompleteRestaurantDetails(id: string){
    return this.http.get(this.baseUrl+'/restaurants/'+id);
  }

  fetchSortedRestaurantData(by: string, order: any="asc"){
    if (order === "asc") order = 1;
    else if (order === "desc") order = -1;
    else return;
    return this.http.get(this.baseUrl+'/restaurants/sort/by/'+by+'/order/'+order);
  }

  fetchSearchedRestaurantData(searchQuery: string){
    return this.http.get(this.baseUrl+'/restaurants/search/name/'+searchQuery);
  }
}
