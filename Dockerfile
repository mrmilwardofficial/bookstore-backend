# Use lightweight Java 17 base image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy everything into container
COPY . .

# Grant permission and build the app
RUN chmod +x mvnw && ./mvnw clean install -DskipTests

# Run the built JAR file
CMD ["java", "-jar", "target/bookstore-1.0.0.jar"]
