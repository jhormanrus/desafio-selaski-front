import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrder, Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersData!: Order[]
  usersData!: User[]
  orderForm!: FormGroup

  constructor(private sOrder: OrderService, private sUser: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initOrderForm()
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
      TotalValue: 0,
      Status: 1
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

  initOrderForm() {
    this.orderForm = this.fb.group({
      create: this.fb.group({
        idUser: this.fb.control(null, [Validators.required]),
        orderNumber: this.fb.control(null, [Validators.required]),
        providerName: this.fb.control(null, [Validators.required]),
        observation: this.fb.control(null, [Validators.required])
      })
    })
  }
}
