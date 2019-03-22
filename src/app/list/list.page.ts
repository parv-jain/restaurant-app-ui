import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private restaurants: any;
  private page: number = 1;
  private size: number = 100;
  private searchQuery: string = '';
  constructor(private apiService: ApiService, private toastCtrl: ToastController) {
  }

  //act as refresh data function, and call each time app is initialised / refreshed
  ngOnInit($event ?) {
    this.apiService.fetchPaginatedRestaurantsData(this.page, this.size).subscribe((data) => {
      this.restaurants = data;
      console.log(this.restaurants);
    }, (err) => {
      this.presentToastWithOptions("Some network error occured. Please try after some time.");
    });
  }

  //to show search query filtered data (min. 3 letters required to hit search api)
  onInput(ev){
    this.searchQuery = ev.target.value.replace(/[^\w\s]/gi, '');
    if(this.searchQuery.length >= 3){
      this.apiService.fetchSearchedRestaurantData(this.searchQuery).subscribe((data) => {   
        this.restaurants = data;
        console.log(this.restaurants);
      }, (err) => {
        this.presentToastWithOptions("Some network error occured. Please try after some time.");
      });  
    }
    else{
      //Refresh data to show all restaurants (used in case user cleans search query)
      this.ngOnInit();
    }
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: "primary",
      showCloseButton: true,
      position: 'bottom',
      duration: 5000,
      closeButtonText: 'Dismiss'
    });
    toast.present();
  }

  //to sort data and render sorted filtered data
  sort(by, order){
    this.apiService.fetchSortedRestaurantData(by, order).subscribe((data) => {
      this.restaurants = data;
      console.log(this.restaurants);
    }, (err) => {
      this.presentToastWithOptions("Some network error occured. Please try after some time.");
    });
  }
}
