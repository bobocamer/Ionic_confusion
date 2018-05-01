import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  total: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      @Inject('BaseURL') public BaseURL,
       private favoriteservice: FavoriteProvider,
       private toastCtrl: ToastController,
       private actionSheetCtrl: ActionSheetController,
       public modalCtrl: ModalController ) {
        this.dish = navParams.get('dish');
        this.favorite = favoriteservice.isFavorite(this.dish.id);
        this.numcomments = this.dish.comments.length;
         this.total = 0;
        this.dish.comments.forEach(comment => this.total += comment.rating );
        this.avgstars = (this.total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully', //showing toasting message
      position: 'middle',
      duration: 3000}).present();
  }

  presentCommentModal() {
    let commentModal = this.modalCtrl.create(CommentPage);
    commentModal.present();
    commentModal.onDidDismiss(comment => {
      if(comment) {
        this.dish.comments.push(comment);
        this.total = this.total + comment.rating
      }
    });
  }

  addComment() {
    console.log('adding comment');
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.favorite = this.favoriteservice.addFavorite(this.dish.id);
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            this.presentCommentModal();
            
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    actionSheet.present();
  }

}
