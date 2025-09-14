import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,                
  templateUrl: './home.html',
  styleUrls: ['./home.scss']        
})
export class Home {

  private router: Router = new Router;

  aboutButton(){
    this.router.navigate(['/about'])
  }
}
