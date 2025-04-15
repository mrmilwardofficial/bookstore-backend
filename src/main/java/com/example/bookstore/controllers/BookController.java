package com.example.bookstore.controllers;

import com.example.bookstore.bookservice.BookService;
// Ensure the correct package path for BookDTO
import com.example.bookstore.dto.BookDTO; // Update this if the package path is different
import com.example.bookstore.models.Book;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // ✅ Get all books
    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        List<BookDTO> books = bookService.getAllBooks()
                .stream()
                .map(bookService::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(books);
    }

    // ✅ Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(bookService.toDTO(book));
    }

    // ✅ Get books by category ID
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<BookDTO>> getBooksByCategory(@PathVariable Long categoryId) {
        List<BookDTO> books = bookService.getBooksByCategory(categoryId)
                .stream()
                .map(bookService::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(books);
    }

    // ✅ Create book (via DTO with categoryId)
    @PostMapping
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDTO) {
        Book saved = bookService.addBook(bookDTO.getCategoryId(), bookService.fromDTO(bookDTO));
        return new ResponseEntity<>(bookService.toDTO(saved), HttpStatus.CREATED);
    }

    // ✅ Update entire book
    @PutMapping("/books/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        BookDTO updatedBook = bookService.updateBook(id, bookDTO);
        return ResponseEntity.ok(updatedBook);
    }
    

    // ✅ Patch (partial update)
    @PatchMapping("/{id}")
    public ResponseEntity<BookDTO> patchBook(@PathVariable Long id, @RequestBody BookDTO patchDTO) {
        Book patched = bookService.patchBook(id, patchDTO);
        return ResponseEntity.ok(bookService.toDTO(patched));
    }

    // ✅ Delete book
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.noContent().build();
    }
}
