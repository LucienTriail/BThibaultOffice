import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Users} from "../../core/interface/users";
import {ToastService} from "../../core/services/toast.service";


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  value: string = '';


  user: Users = {
    "username": "",
    "password": ""
  };

  constructor(private api: ApiService, private toast: ToastService) {
  }

  ngOnInit(): void {
    this.api.getSingleUser().subscribe((data) => {
      console.log('data: ', data);
      this.user = data;
    });

  }

  showSuccess() {
    this.toast.showSuccess('Modification enregistrée');
  }

  changeField() {
    this.api.editSingleUser(this.user).subscribe(
      (data) => {
        console.log('response: ', data);
        this.showSuccess();
      }
    );

  }

}
