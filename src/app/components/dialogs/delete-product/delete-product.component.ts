import { HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private httpRequestsService: HttpRequestsService,
    private router: Router
  ){}

  delete() {
    const params = new HttpParams()
    .set('id',this.data.id);
    this.httpRequestsService.delete('/products', params).subscribe({
      next: (data: any) => {
        if (data.errorMessage) {
          console.log(data.errorMessage);
          this.close();
        } else {
          console.log(data.message);
          this.router.navigate(['products']);
          this.close();
        }
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}