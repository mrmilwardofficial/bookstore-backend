package com.example.bookstore.models;
import jakarta.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(
    uniqueConstraints = @UniqueConstraint(columnNames = {"title", "author"})
)

public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Title is required")
    private String title;
    @NotBlank(message = "Author is required")
    private String author;
    @Positive(message = "Price must be positive")
    private double price;
   @ManyToOne
@JoinColumn(name = "category_id")
@JsonBackReference
private Category category;

    }
   
