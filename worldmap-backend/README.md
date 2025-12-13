# Chingu Worldmap Backend

A robust Spring Boot REST API backend that powers the Chingu Worldmap application, providing member statistics, demographics data, and country-level analytics for a global community visualization platform.

## 🚀 Project Overview

This backend service was built to support a full-stack application that visualizes Chingu community members across the globe. It provides RESTful endpoints for member management, statistical analysis, and demographic insights.

## 🛠️ Tech Stack

- **Framework:** Spring Boot 3
- **Language:** Java 17+
- **Database:** PostgreSQL (Neon Cloud)
- **ORM:** Spring Data JPA / Hibernate
- **Build Tool:** Maven
- **Architecture:** RESTful API with layered architecture

## 📁 Project Structure

```
worldmap-backend/
├── src/main/java/com/example/worldmap_backend/
│   ├── config/
│   │   ├── CorsConfig.java          # CORS configuration for frontend integration
│   │   └── DataInitializer.java     # Database seeding with sample data
│   ├── controller/
│   │   └── MemberController.java    # REST API endpoints
│   ├── dto/
│   │   ├── ChartDataDTO.java        # Chart data transfer object
│   │   ├── CommonValueDTO.java      # Most common values DTO
│   │   ├── CountryStats.java        # Basic country statistics
│   │   ├── DemographicsStatsDTO.java # Demographics analytics DTO
│   │   ├── EnhancedCountryStatsDTO.java # Enhanced country-level stats
│   │   ├── MemberFilter.java        # Filter criteria for queries
│   │   └── SummaryStatsDTO.java     # Summary statistics DTO
│   ├── entity/
│   │   └── Member.java              # JPA entity for members table
│   ├── repository/
│   │   └── MemberRepository.java    # Data access layer
│   ├── service/
│   │   └── MemberService.java       # Business logic layer
│   ├── specification/
│   │   └── MemberSpecification.java # Dynamic query builder
│   └── util/
│       └── CountryCoordinates.java  # 180+ country coordinate mappings
└── src/main/resources/
    └── application.properties       # Configuration settings
```

## 🔑 Key Features & Contributions

### REST API Endpoints
Built a comprehensive REST API with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/members` | Retrieve all members with optional filtering |
| GET | `/api/members/{id}` | Get a single member by ID |
| POST | `/api/members` | Create a new member |
| PUT | `/api/members/{id}` | Update an existing member |
| DELETE | `/api/members/{id}` | Delete a member |
| GET | `/api/members/stats/countries` | Get basic country statistics |
| GET | `/api/members/stats/demographics` | Get demographics with charts |
| GET | `/api/members/stats/countries-enhanced` | Get enhanced country stats with coordinates |
| GET | `/api/members/stats/summary` | Get summary statistics |

### Dynamic Filtering System
Implemented a flexible filtering system using Spring Data JPA Specifications:
- Filter by gender, country, year joined, role type, role, solo project tier, voyage tier, and voyage
- Supports multiple simultaneous filters
- Case-insensitive matching for gender values

### Data Transfer Objects (DTOs)
Designed and implemented DTOs for clean API responses:
- **ChartDataDTO:** Structured data for frontend chart rendering
- **DemographicsStatsDTO:** Aggregated demographics including role charts, gender distribution, and most common values
- **EnhancedCountryStatsDTO:** Country-level statistics with coordinates, member counts, top roles, and gender distribution
- **SummaryStatsDTO:** High-level summary for dashboard display

### Country Coordinate Mapping
Created a comprehensive utility class with coordinates for 180+ countries:
- Maps ISO country codes to latitude/longitude coordinates
- Enables accurate map marker placement on the frontend
- Handles edge cases and unknown country codes gracefully

### Database Integration
- Configured PostgreSQL connection with Neon Cloud
- Implemented JPA entities with proper annotations
- Created data initialization script for seeding sample data
- Optimized queries with Hibernate

### CORS Configuration
Configured Cross-Origin Resource Sharing to allow seamless frontend-backend communication during development and production.

## 🧪 API Usage Examples

### Get All Members with Filters
```bash
GET /api/members?gender=MALE&country=United States&yearJoined=2024
```

### Get Demographics Statistics
```bash
GET /api/members/stats/demographics?gender=FEMALE&roleType=Web
```

### Get Enhanced Country Statistics
```bash
GET /api/members/stats/countries-enhanced
```

Response:
```json
[
  {
    "countryName": "United States",
    "countryCode": "US",
    "latitude": 37.0902,
    "longitude": -95.7129,
    "count": 450,
    "topRole": "Developer",
    "commonGender": "MALE"
  }
]
```

## 🏗️ Architecture Highlights

### Layered Architecture
- **Controller Layer:** Handles HTTP requests/responses
- **Service Layer:** Contains business logic and data aggregation
- **Repository Layer:** Data access using Spring Data JPA
- **Specification Layer:** Dynamic query building for flexible filtering

### Design Patterns Used
- **DTO Pattern:** Separates internal entities from API contracts
- **Repository Pattern:** Abstracts data access logic
- **Specification Pattern:** Enables dynamic, type-safe queries
- **Builder Pattern:** Used in DTOs for clean object construction

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- PostgreSQL database (or Neon Cloud account)

### Setup
1. Clone the repository
2. Configure database connection in `application.properties`
3. Run the application:
```bash
cd worldmap-backend
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

### Environment Configuration
Create an `application.properties` file with:
```properties
spring.datasource.url=jdbc:postgresql://your-database-url
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
```

## 📊 Skills Demonstrated

- **Backend Development:** Spring Boot, REST API design, Java
- **Database Management:** PostgreSQL, JPA/Hibernate, SQL
- **Software Architecture:** Layered architecture, design patterns
- **API Design:** RESTful conventions, DTO patterns, filtering/pagination
- **Code Quality:** Clean code principles, separation of concerns
- **DevOps:** Database configuration, CORS setup, environment management

## 🤝 Integration

This backend integrates with a Next.js frontend application, providing:
- Real-time member data for interactive world map visualization
- Statistical data for charts and dashboards
- Filtered views based on user-selected criteria

---

**Built with ❤️ by me Kevin Llanos**
