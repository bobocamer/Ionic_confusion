import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../shared/user';
import { isTrueProperty } from 'ionic-angular/util/util';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formbuilder: FormBuilder,
    private storage: Storage) {

      storage.get('user').then(user => {
        if (user) {
          console.log(user);
          this.user = user;
          this.loginForm
            .patchValue({
              'username': this.user.username,
              'password': this.user.password
            });
        }
        else
          console.log('user not defined');
      });

      this.loginForm = this.formbuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: true
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.loginForm.value, this.user);
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    console.log(this.user);
    if(this.loginForm.get('remember').value)
      this.storage.set('user', this.user)
    else
     this.storage.remove('user');
     this.viewCtrl.dismiss();
  }
}
