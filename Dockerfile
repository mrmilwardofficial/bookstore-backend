# Start with OpenJDK image
FROM eclipse-temurin:17-jdk-alpine:17.0.8_7-jdk-alpine

# Set working directory
WORKDIR /app

# Copy everything and build the app
COPY . .

# Build the app
RUN ./mvnw clean install -DskipTests

# Run the app
CMD ["java", "-jar", "target/bookstore-0.0.1-SNAPSHOT.jar"]
