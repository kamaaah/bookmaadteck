import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBEzCo2Qr0ULBI-dh5BJ5ZN26zx7A3bNv4",
      authDomain: "bookmaadteck.firebaseapp.com",
      databaseURL: "https://bookmaadteck.firebaseio.com",
      projectId: "bookmaadteck",
      storageBucket: "bookmaadteck.appspot.com",
      messagingSenderId: "408861503052",
      appId: "1:408861503052:web:19f0ce65f21cb4aa1b8ee9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
