import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookFrom: FormGroup;
  fileIsUploading = false; // pour savoir si il y a un fichier en train de charger
  fileUrl: string; // downloadURL que l'on va récupérer avec la méthode uploadFile ds BooksService
  fileUploaded = false; // pour signaler la fin du chargement du fichier

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookFrom = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSaveBook() {
    const title = this.bookFrom.get('title').value;
    const author = this.bookFrom.get('author').value;
    const newBook = new Book(title, author);
    if (this.fileUrl && this.fileUrl !== '') {  // vérifier qu'il y a un fichier en train de charger sur la page
      newBook.photo = this.fileUrl;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) { // va déclencher la méthode du service et mettre le DOM à jour au fur et à mesure
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true; // il y a un fichier qui a été charger
      }
    );
  }

  detectFiles(event) {  // pour gérer la méthode de type "file" => dectecte un évenement qui vient du DOM
    this.onUploadFile(event.target.files[0]);
  }

}
