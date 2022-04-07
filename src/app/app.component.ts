import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'expense-managment-app';
  message:any
  expense: string = '';
  amount: any = '';
  show: boolean = false;
  showme = true;
  expenseArray: any[] = [];
 
  // totalbudget
  getTotalBudget = localStorage.getItem('totalBudget');
  totalBudget: any = this.getTotalBudget
    ? JSON.parse(this.getTotalBudget)
    : null;
  // expenseArray
  getArrayExpense = localStorage.getItem('expenseArray');

  // RemainingBudget
  getRemainingBudget = localStorage.getItem('setremainingbudget');
  remainingBudget: any = this.getRemainingBudget
    ? JSON.parse(this.getRemainingBudget)
    : null;

  constructor(private dialog: MatDialog, private snakbar:MatSnackBar) {
    if (this.getArrayExpense == null) {
      this.expenseArray = [];
    } else {
      this.expenseArray = JSON.parse(this.getArrayExpense);
    }
  }

  open() {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      data: { expsne: this.expense, amount: this.amount },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.amount = result.amount;
      this.expense = result.expense;
    
      if(this.totalBudget-this.remainingBudget<this.amount ){
        this.snakbar.open("no enough amount",'undo')
      }
      
      else {
        const obj = {
          amount:  this.amount,
          expense: this.expense,
        };
      
        this.expenseArray.push(obj);
    
        localStorage.setItem('expenseArray', JSON.stringify(this.expenseArray));
       
        const InitialValue = 0;
        
        this.remainingBudget = this.expenseArray.reduce(
          (previousValue: any, currentValue: any) => {
            return previousValue +parseInt(currentValue.amount )
          },
          InitialValue
        );
  
        localStorage.setItem('setremainingbudget', this.remainingBudget);
       
      }
      this.amount = '';
    });
  }
  addBudget() {
    localStorage.setItem('totalBudget', this.totalBudget);
    this.show = true;
    this.showme = false;
  }
  editBudget() {
    localStorage.setItem('totalBudget', this.totalBudget);
    this.showme = true;
    this.show = false;
  }
}
