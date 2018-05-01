import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
commentForm: FormGroup;
 comment: Comment;
 dish: Dish;

  constructor(public navCtrl: NavController, public navParams: NavParams,
        private formBuilder: FormBuilder,
        public viewCtrl: ViewController,
        public modalCtrl: ModalController) {

          this.commentForm = this.formBuilder.group({
            name: '',
            rating: 3,
            comment: ['', Validators.required]
          });
  }


  presentCommentModal() {
    let commentModal = this.modalCtrl.create(Comment);
    commentModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date= new Date().toISOString();
    //this.dish.comments.push(this.comment);
    //console.log(this.comment);
   // this.dismiss();
    

    this.viewCtrl.dismiss(this.comment);
  }
  
 // dismiss() {
   // this.comment = this.commentForm.value;
   // this.comment.date = new Date().toISOString();
   // this.viewCtrl.dismiss(this.commentForm.value);
 // }
  
}
