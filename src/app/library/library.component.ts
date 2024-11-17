import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';
import { Book } from '../_model/book.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GoogleBooksService } from '../_services/google-books.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  googleBooks: any[] = [];
  isDeleteInProgress: boolean = false;
  searchQuery: string = '';
  isAdmin: boolean = false;

  constructor(private bookService: BookService,
    private googleBooksService: GoogleBooksService,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole('ADMIN');
    this.getAllBooks();
    this.searchGoogleBooks('terror cosmico, ciencia ficcion, biologia');
  }
  trackById(index: number, book: any): number {
    return book.id;
  }
  getAllBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = data;
    });
  }
  searchBooks() {
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    if (this.searchQuery) {
      this.searchGoogleBooks(this.searchQuery);
    } else {
      this.googleBooks = [];
    }
  }
  searchGoogleBooks(query: string) {
    this.googleBooksService.searchBooks(query).subscribe((response: any) => {
      this.googleBooks = response.items.map((item: any) => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Autor desconocido',
        image: { imageUrl: item.volumeInfo.imageLinks?.thumbnail || '/assets/defecto.png' },
        description: item.volumeInfo.description || 'Sin descripción',
        publicationDate: item.volumeInfo.publishedDate || 'Fecha desconocida',
        file: { fileUrl: item.accessInfo.webReaderLink || null }
      }));
    });
  }
  readOnline(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error("El archivo PDF no está disponible.");
    }
  }
  deleteBook(id: number) {
    if (!this.isAdmin) return;
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeleteInProgress = true;
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El libro ha sido eliminado', 'success');
            this.isDeleteInProgress = false;
            this.getAllBooks();
          },
          error: () => {
            this.isDeleteInProgress = false;
            Swal.fire('Error', 'No se pudo eliminar el libro', 'error');
          }
        });
      }
    });
  }
}
