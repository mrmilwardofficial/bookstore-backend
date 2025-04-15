package com.example.bookstore.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private double price;
    private Long categoryId;
    private String categoryName;
}
