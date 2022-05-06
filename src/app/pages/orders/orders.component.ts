import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrder, Order, UpdateOrder } from 'src/app/models/order';
import { CreateOrderProduct, OrderProduct, UpdateOrderProduct } from 'src/app/models/order-product';
import { User } from 'src/app/models/user';
import { OrderProductService } from 'src/app/services/order-product.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersData!: Order[]
  orderData!: Order
  productsData!: OrderProduct[]
  productData!: OrderProduct
  usersData!: User[]
  orderForm!: FormGroup
  productForm!: FormGroup

  constructor(private sOrder: OrderService, private sProduct: OrderProductService, private sUser: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initOrderForm()
    this.initProductForm()
    this.getAllOrders()
    this.getAllUsers()
  }

  getAllOrders() {
    this.sOrder.getByUserId(2).subscribe({
      next: (data) => {
        this.ordersData = data.filter(order => order.Status === 1)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getAllUsers() {
    this.sUser.getAll().subscribe({
      next: (data) => {
        this.usersData = data
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  createOrder() {
    const order: CreateOrder = {
      IdUser: this.orderForm.value.create.idUser,
      OrderNumber: this.orderForm.value.create.orderNumber,
      DateTime: new Date().toJSON().slice(0, 19).replace('T', ' '),
      ProviderName: this.orderForm.value.create.providerName,
      DateCreated: new Date().toJSON().slice(0, 19).replace('T', ' '),
      Observation: this.orderForm.value.create.observation,
      TotalValue: 0
    }
    this.sOrder.create(order).subscribe({
      next: (data) => {
        this.getAllOrders()
        this.orderForm.reset()
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateOrder() {
    const order: UpdateOrder = {
      IdOrder: this.orderData.IdOrder,
      IdUser: this.orderData.IdUser,
      OrderNumber: this.orderForm.value.update.orderNumber,
      DateTime: new Date().toJSON().slice(0, 19).replace('T', ' '),
      ProviderName: this.orderForm.value.update.providerName,
      DateCreated: new Date(this.orderData.DateCreated).toJSON().slice(0, 19).replace('T', ' '),
      Observation: this.orderForm.value.update.observation,
      TotalValue: this.orderData.TotalValue
    }
    this.sOrder.update(order).subscribe({
      next: (data) => {
        this.getAllOrders()
        this.orderForm.reset()
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteOrder(id: number) {
    this.sOrder.delete(id).subscribe({
      next: (data) => {
        this.getAllOrders()
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getOrderProducts(order: Order) {
    this.sProduct.getByOrderId(order.IdOrder).subscribe({
      next: (data) => {
        this.orderData = order
        this.productsData = data.filter(product => product.Status === 1)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  createProduct() {
    const product: CreateOrderProduct = {
      IdOrder: this.orderData.IdOrder,
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
        this.getOrderProducts(this.orderData)
        this.productForm.reset()
      }
    })
  }

  setProduct(product: OrderProduct) {
    this.productData = product
    this.productForm.patchValue({
      update: {
        valueUnit: this.productData.ValueUnit,
        unit: this.productData.Unit,
        description: this.productData.Description,
        quantity: this.productData.Quantity,
        quantityBox: this.productData.QtyBox,
        weight: this.productData.Weight,
        volumen: this.productData.Volumen,
        mark: this.productData.Mark
      }
    })
  }

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
        this.getOrderProducts(this.orderData)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  deleteProduct(product: OrderProduct) {
    this.sProduct.delete(product.IdOrdersProducts).subscribe({
      next: (data) => {
        this.getOrderProducts(this.orderData)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  initOrderForm() {
    this.orderForm = this.fb.group({
      create: this.fb.group({
        idUser: this.fb.control(null, [Validators.required]),
        orderNumber: this.fb.control(null, [Validators.required]),
        providerName: this.fb.control(null, [Validators.required]),
        observation: this.fb.control(null, [Validators.required])
      }),
      update: this.fb.group({
        orderNumber: this.fb.control(null, [Validators.required]),
        providerName: this.fb.control(null, [Validators.required]),
        observation: this.fb.control(null, [Validators.required])
      })
    })
  }

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
