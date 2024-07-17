import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service: UserService, private router: Router) { }

  currentPage: number = 1;
  itemsPerPage: number = 8;
  categories: string[] = [];
  products: any[] = [];
  totalItems: any[] = [];
  cartProductCount!: number;

  ngOnInit(): void {
    this.service.loadcatgory().subscribe((res) => {
      res.forEach((data: string) => {
        this.categories.push(data);
      });
    });

    this.loadAllProduct()
      .then(() => {
        // Slice the products array to display only the first 8 items on initial load
        this.products = this.totalItems.slice(0, this.itemsPerPage);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      });

    this.onPageChange(1);
  }

  showcat(cat: string) {
    this.service.showcat(cat).subscribe((res) => {
      this.products = res;
    });
    this.totalItems = [...this.products];
  }

  productdetails(product: any) {
    this.router.navigateByUrl(`productdetails/${product.id}`);
  }

  loadAllProduct(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.showallproduct().subscribe(
        (res) => {
          this.totalItems = res; // Load all products
          resolve(); // Resolve the promise after successful loading
        },
        (error) => {
          reject(error); // Reject the promise on error
        }
      );
    });
  }

  addToCart() {
    this.service.getCount().subscribe((res) => {
      this.cartProductCount = res;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;

    // Implement logic to fetch data for the current page
    const start = (page - 1) * this.itemsPerPage;
    this.products = this.totalItems.slice(start, start + this.itemsPerPage);
    console.log("total items", this.totalItems);
    console.log("pagination", this.products);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(start, start + this.itemsPerPage);
  }


  searchProduct(data: string) {
    console.log("inside parent component ==>", data);

    // Create a regex pattern from the input data, case insensitive
    const pattern = new RegExp(data, 'i');

    // Filter the products array based on the pattern
    const filteredProducts = this.totalItems.filter(product => pattern.test(product.title));
    if (filteredProducts.length >= 1) {
      this.products = filteredProducts;


    } else {
      this.loadAllProduct()

    }



  }

}
