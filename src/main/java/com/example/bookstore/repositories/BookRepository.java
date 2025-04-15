package com.example.bookstore.repositories;

import com.example.bookstore.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository  // 👈 This annotation is REQUIRED!
public interface BookRepository extends JpaRepository<Book, Long> {
	List<Book> findByCategoryId(Long categoryId);
	Optional<Book> findByTitleAndAuthor(String title, String author);

}
