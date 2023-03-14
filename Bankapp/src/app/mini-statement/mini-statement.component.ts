import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css'],
})
export class MiniStatementComponent implements OnInit {
  searchKey: string = '';
  allTransactions: any;

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getAllTransactions().subscribe((result: any) => {
      this.allTransactions = result.transaction;
      console.log(this.allTransactions);
    });
  }
  search(event: any) {
    this.searchKey = event.target.value;
  }

  //generate pdf

  generatePDF() {
    var pdf = new jspdf();
    let col = ['type', 'FromAcno', 'ToAcno','Amount'];
    let row: any = [];
    pdf.setFontSize(16);
    pdf.text('Mini Statement', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    //convert items to nested array.
    var itemNew = this.allTransactions;
 for(let element of itemNew) {
        var temp = [
          element.type,
          element.fromAcno,
          element.toAcno,
          element.amount,
        ];
        row.push(temp);
      }
      (pdf as any)
      .autoTable(col, row, { staryY: 10 });




    pdf.output('dataurlnewwindow');
    pdf.save('Statement.pdf');
  }
}
