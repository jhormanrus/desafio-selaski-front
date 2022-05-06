import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateOrderProduct, OrderProduct, UpdateOrderProduct } from 'src/app/models/order-product';
import { OrderProductService } from 'src/app/services/order-product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  orderId!: number
  productsData!: OrderProduct[]
  productData!: OrderProduct
  productForm!: FormGroup

  constructor(private sProduct: OrderProductService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initProductForm()
    this.route.params.subscribe(params => {
      this.orderId = params['id']
      this.getOrderProducts(this.orderId)
    })
  }


  /**
   * Gets products by order id and sets them to productsData
   * @param id - IdOrder to get products
   */
  getOrderProducts(id: number) {
    this.sProduct.getByOrderId(id).subscribe({
      next: (data) => {
        this.productsData = data.filter(product => product.Status === 1)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  /**
   * Creates product according to productForm.value.create
   */
  createProduct() {
    const product: CreateOrderProduct = {
      IdOrder: this.orderId,
      ValueUnit: this.productForm.value.create.valueUnit,
      Unit: this.productForm.value.create.unit,
      Description: this.productForm.value.create.description,
      SKU: this.productForm.value.create.sku,
      Quantity: this.productForm.value.create.quantity,
      QtyBox: this.productForm.value.create.quantityBox,
      Weight: this.productForm.value.create.weight,
      Volumen: this.productForm.value.create.volumen,
      Mark: this.productForm.value.create.mark
    }
    this.sProduct.create(product).subscribe({
      next: (data) => {
        this.getOrderProducts(this.orderId)
        this.productForm.reset()
      }
    })
  }


  /**
   * Sets productData and productForm.value.update
   * @param product - OrderProduct to be setted
   */
  setProduct(product: OrderProduct) {
    this.productData = product
    this.productForm.get('update')!.patchValue({
      valueUnit: this.productData.ValueUnit,
      unit: this.productData.Unit,
      description: this.productData.Description,
      quantity: this.productData.Quantity,
      quantityBox: this.productData.QtyBox,
      weight: this.productData.Weight,
      volumen: this.productData.Volumen,
      mark: this.productData.Mark
    })
  }


  /**
   * Updates product according to productForm.value.update
   */
  updateProduct() {
    const product: UpdateOrderProduct = {
      IdOrdersProducts: this.productData.IdOrdersProducts,
      IdOrder: this.productData.IdOrder,
      ValueUnit: this.productForm.value.update.valueUnit,
      Unit: this.productForm.value.update.unit,
      Description: this.productForm.value.update.description,
      SKU: this.productData.SKU,
      Quantity: this.productForm.value.update.quantity,
      QtyBox: this.productForm.value.update.quantityBox,
      Weight: this.productForm.value.update.weight,
      Volumen: this.productForm.value.update.volumen,
      Mark: this.productForm.value.update.mark
    }
    this.sProduct.update(product).subscribe({
      next: (data) => {
        this.getOrderProducts(this.orderId)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  /**
   * Deletes product according to IdOrdersProducts from product
   * @param product - OrderProduct to be deleted
   */
  deleteProduct(product: OrderProduct) {
    this.sProduct.delete(product.IdOrdersProducts).subscribe({
      next: (data) => {
        this.getOrderProducts(this.orderId)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  /**
   * Inits product form
   */
  initProductForm() {
    this.productForm = this.fb.group({
      create: this.fb.group({
        valueUnit: this.fb.control(null, [Validators.required]),
        unit: this.fb.control(null, [Validators.required]),
        description: this.fb.control(null, [Validators.required]),
        sku: this.fb.control(null, [Validators.required]),
        quantity: this.fb.control(null, [Validators.required]),
        quantityBox: this.fb.control(null, [Validators.required]),
        weight: this.fb.control(null, [Validators.required]),
        volumen: this.fb.control(null, [Validators.required]),
        mark: this.fb.control(null, [Validators.required])
      }),
      update: this.fb.group({
        valueUnit: this.fb.control(null, [Validators.required]),
        unit: this.fb.control(null, [Validators.required]),
        description: this.fb.control(null, [Validators.required]),
        quantity: this.fb.control(null, [Validators.required]),
        quantityBox: this.fb.control(null, [Validators.required]),
        weight: this.fb.control(null, [Validators.required]),
        volumen: this.fb.control(null, [Validators.required]),
        mark: this.fb.control(null, [Validators.required])
      })
    })
  }
}
