import { Component, OnInit } from '@angular/core';
import { MethodService } from '../service/method.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-numberselection',
  imports: [CommonModule],
  templateUrl: './numberselection.component.html',
  styleUrl: './numberselection.component.css'
})
export class NumberselectionComponent implements OnInit{

  data:any;
  istoggled : number;
  arrow = '▼';
  type : string = '';
  constructor(private methodService : MethodService, private router : Router){
    this.istoggled = 0;
  }

  ngOnInit(): void {

    this.methodService.getActiveNumber().subscribe({
      next : (res) => {
        console.log(res);
        this.data = res;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }
  clickArrow(num: number){
    if(this.arrow == '▲')
    {
      this.arrow = '▼';
      this.istoggled = 0;
    }
    else if(this.arrow == '▼')
    {
      this.arrow = '▲';
      this.istoggled=num;
    }
  }

  selectType(str : string)
  {
    this.type = str;
    console.log(str);
  }

  selectNumber(number : any){
    if(this.type == '')
    {
      window.alert("Select Type");
      return;
    }
    const customer = JSON.parse(sessionStorage.getItem('userDetails') || '{}')
    customer.phoneNumber= number.phoneNumber;
    customer.status='Pending';
    customer.type=this.type;
    this.methodService.activateNumber(customer).subscribe({
      next : (res) => {
        console.log(res);
        sessionStorage.setItem("newSim",'yes')
        sessionStorage.setItem('userDetails',JSON.stringify(customer))
        this.router.navigate(['retailer/home/recharge'])
      },
      error : (err) => {
        console.log(err);
      }
    });

  }

}
