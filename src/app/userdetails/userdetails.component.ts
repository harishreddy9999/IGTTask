import { Component ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent {
  Api: string;
  userDetails: any;
  constructor(
    public dialogRef: MatDialogRef<UserdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private http: HttpClient
  ) {
    console.log(data)
    this.Api="https://gorest.co.in/public-api/users/"+data.id
    this.fetchUserDetails();
  }

  fetchUserDetails(){
     this.http.get<any>(this.Api).subscribe({
      next: (response) => {
        this.userDetails = response.data;
        console.log(this.userDetails);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
}
}