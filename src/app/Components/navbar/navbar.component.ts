import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private service:UserService, private router:Router){

  }
  @Output() event=new EventEmitter()
  cartProductCount!:number
  inputvalue!:string

  ngOnInit(){
    
    this.service.getCount().subscribe((res)=>{
      this.cartProductCount=res
    })

  }
  searchProduct(data:any){
    this.event.emit(data)
  }
  profilepage(){
    this.router.navigateByUrl("/profile")
  }
}
