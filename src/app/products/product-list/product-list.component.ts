import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title = 'Products';
  //products:Product[];
  products$: Observable<Product[]>;
  productsNumber$: Observable<number>;
  selectedProduct: Product;
  errorMessage: string;

  // Pagination
  pageSize: number = 5;
  start: number = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.selectedProduct = null;
    this.currentPage--;
  }

  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.selectedProduct = null;
    this.currentPage++;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.products$ = this
                      .productService
                      .products$
                      .pipe(
                        catchError(
                          error => {
                            this.errorMessage = error;
                            return EMPTY;
                          }
                        )
                      );

    this.productsNumber$ = this
                            .products$
                            .pipe(
                              map(products => products.length)
                            );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     data => this.products = data
    //   )
   }

}
