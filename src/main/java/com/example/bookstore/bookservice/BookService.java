package com.example.bookstore.bookservice;

import com.example.bookstore.dto.BookDTO;
import com.example.bookstore.models.Book;
import com.example.bookstore.models.Category;
import com.example.bookstore.repositories.BookRepository;
import com.example.bookstore.repositories.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // ✅ Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // ✅ Get book by ID
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    }

    // ✅ Get books by category
    public List<Book> getBooksByCategory(Long categoryId) {
        return bookRepository.findByCategoryId(categoryId);
    }

    // ✅ Add book
    public Book addBook(Long categoryId, Book book) {
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        book.setCategory(category);

        Optional<Book> existing = bookRepository.findByTitleAndAuthor(book.getTitle(), book.getAuthor());
        if (existing.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Book already exists");
        }

        return bookRepository.save(book);
    }

    // ✅ Update entire book
    public BookDTO updateBook(Long id, BookDTO bookDto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPrice(bookDto.getPrice());
    
        // Assuming you have a categoryId field in DTO
        if (bookDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(bookDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            book.setCategory(category);
        }
    
        Book updated = bookRepository.save(book);
        return toDTO(updated); // Using the existing toDTO method for mapping
    }
    
    // ✅ Patch book (partial update)
    public Book patchBook(Long id, BookDTO patchDTO) {
        Book book = getBookById(id);

        if (patchDTO.getTitle() != null) book.setTitle(patchDTO.getTitle());
        if (patchDTO.getAuthor() != null) book.setAuthor(patchDTO.getAuthor());
        if (patchDTO.getPrice() != 0) book.setPrice(patchDTO.getPrice());
        if (patchDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(patchDTO.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
            book.setCategory(category);
        }

        return bookRepository.save(book);
    }

    // ✅ Delete
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
    

    // ✅ Mapping methods
    public BookDTO toDTO(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setPrice(book.getPrice());
        dto.setCategoryId(book.getCategory().getId());
        dto.setCategoryName(book.getCategory().getName());
        return dto;
    }
    

    public Book fromDTO(BookDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setPrice(dto.getPrice());
        book.setCategory(category);
        return book;
    }
}
