import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from '@angular/router';
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmPopupComponent} from "../../shared/confirm-popup/confirm-popup.component";

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private booksService: BooksService, private route: Router, private dialogService: DialogService) {
  }

  currentBook: Book;
  removeSuccess: boolean = false;
  searchString: string = "";
  currentCategory: string = "";

  categories: string[] = [];
  filteredBooks: Book[] = [];
  books: Book[] = [];


  ngOnInit() {
    this.getBooks();
  }

  getCategories() {
    console.log(this.categories);
    this.categories = [];
    this.books.forEach((book) => {
      if (this.categories.indexOf(book.category) === -1) {
        this.categories.push(book.category);
      }
    });
  }

  filterByCategory(category: string) {
    this.removeSuccess = false;
    this.currentCategory = category;
    this.filter();

  }

  filterBySearchString() {
    this.removeSuccess = false;
    this.filter();
  }

  private filter() {
    this.removeSuccess = false;
    this.filteredBooks = [];
    this.books.filter((book) => {
      if ((book.category === this.currentCategory || this.currentCategory === "")
        && (JSON.stringify(book).toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1 || this.searchString === "")) {
        this.filteredBooks.push(book);
      }
    });
  }

  resetCategoryFilter() {
    this.removeSuccess = false;
    this.currentCategory = "";
    this.filterByCategory(this.currentCategory);
  }

  getBooks() {
    this.booksService.getAllBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
      this.getCategories();
      console.log(this.books);
    })
  }


  removeBook(book: Book) {
    this.removeSuccess = false;
    this.currentBook = book;
    let disposable = this.dialogService.addDialog(ConfirmPopupComponent,
      {
        title: "Confirm Delete",
        message: "Do you want to delete the book " + book.name,
        showTitle: false,
        showAlertOnly: false,
        successBtnLabel: "Remove",
        cancelBtnLabel:"Cancel"
      }
    ).subscribe(isConfirmed => {
      if(isConfirmed) {
        this.booksService.removeBook(book._id).subscribe(res => {
          this.getBooks();
          this.removeSuccess = true;
          this.currentCategory="";
          this.searchString = "";
        });
        
      }
    });
    /*if (confirm("Do you want to delete the book '" + book.name + "'")) {
     this.booksService.removeBook(book._id);
     alert(book.name + " is removed");
     this.getBooks();
     this.removeSuccess = true;
     }*/
  }

  editBook(book: Book) {
    this.removeSuccess = false;
    this.currentBook = book;
    this.route.navigate(["books/edit", book._id]);
  }

}
