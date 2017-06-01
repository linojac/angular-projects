import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {current} from "codelyzer/util/syntaxKind";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmPopupComponent} from "../../shared/confirm-popup/confirm-popup.component";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private booksService: BooksService, private activatedRoute: ActivatedRoute, private route: Router, private dialogService: DialogService) {
  }

  currentBook: Book = new Book();
  action: string = "";
  errorMsg: string = "";
  submitted:boolean=false;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id !== null) {
        this.getBook(id);
      } else {
        this.action = "add";
        this.errorMsg = "";
      }
    });

  }

  getBook(id: string) {
    this.booksService.getBookById(id).subscribe(data => {
      if (data !== null) {
        this.currentBook = data;
        this.action = "edit";
        console.log("Editing book " + data.name);
        this.errorMsg = "";
      } else {
        this.errorMsg = "No book found with the requested Id!! Please add it now.";
        this.action = "add";
      }
    });
  }

  saveOrUpdateBook(book: Book) {

    if (this.action === "edit") {
      book._id = this.currentBook._id;
      this.booksService.updateBook(book).subscribe(book => {
        console.log("Book Updated");
        let disposable = this.dialogService.addDialog(ConfirmPopupComponent,
          {
            title: "Success",
            message: "Updated book'" + book.name +"' Successfully ",
            showTitle: false,
            showAlertOnly: true
          }
        )
        this.listBooks();
      });

    } else {
      this.booksService.saveBook(book).subscribe(book => {
        console.log("Bok saved");
        let disposable = this.dialogService.addDialog(ConfirmPopupComponent,
          {
            title: "Success",
            message: "Book has been succesfully Added!!",
            showTitle: false,
            showAlertOnly: true
          }
        )
        this.listBooks();
      });

    }

  }

  listBooks() {
    this.route.navigate(['books']);
  }

  validate(){
    this.submitted=true;
  }

}
