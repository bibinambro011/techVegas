import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productid: string = ''
  selectedproduct: any

  constructor(private service: UserService, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.productid = this.route.snapshot.params['id'];
    this.showSelectedProduct(this.productid)
  }

  showSelectedProduct(productid: string) {
    this.service.showSelectedProduct(productid).subscribe((res) => {

      this.selectedproduct = { ...res }
      console.log(this.selectedproduct)
    })
  }

  addToCart() {
    this.service.addToCart();

  }


}
