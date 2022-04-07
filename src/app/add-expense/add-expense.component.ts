import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<AddExpenseComponent>,private snakbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }
  // openSnackBar(message:any,action:any){
  //   this.snakbar.open(message,action)
   

  // }

}
