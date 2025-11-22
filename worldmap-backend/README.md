# Chingu Member Demographics Map - Backend

A Spring Boot REST API for managing and filtering Chingu member demographics data.

## Project Structure

```
worldmap-backend/
├── src/main/java/com/example/worldmap_backend/
│   ├── WorldmapBackendApplication.java    # Main application entry point
│   ├── entity/
│   │   └── Member.java                     # Member entity with JPA annotations
│   ├── dto/
│   │   ├── MemberFilter.java               # Filter DTO for query parameters
│   │   └── CountryStats.java               # Country statistics DTO
│   ├── repository/
│   │   └── MemberRepository.java           # JPA repository
│   ├── specification/
│   │   └── MemberSpecification.java        # JPA Specification for dynamic filtering
│   ├── service/
│   │   └── MemberService.java              # Business logic layer
│   ├── controller/
│   │   └── MemberController.java           # REST API endpoints
│   └── config/
│       └── DataInitializer.java            # Sample data initialization
└── src/main/resources/
    └── application.properties              # Database configuration
```

## Tech Stack

- **Java 17**
- **Spring Boot 3.5.7**
- **Spring Data JPA** - Database access layer
- **PostgreSQL** - Primary database
- **Lombok** - Reduces boilerplate code
- **Maven** - Build tool

## Database Configuration

Update `src/main/resources/application.properties` with your PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Demographics Map
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
```

The application uses `spring.jpa.hibernate.ddl-auto=update` which will automatically create/update the database schema.

## Member Entity

The `Member` entity includes the following fields:

| Field | Type | Description |
|-------|------|-------------|
| id | Long | Primary key (auto-generated) |
| gender | String | Member gender |
| country | String | Member country |
| roleType | String | Type of role (e.g., "Voyage", "Solo Project") |
| role | String | Specific role (e.g., "Developer", "Product Owner") |
| soloProjectTier | Integer | Solo project tier (1-3) |
| voyageTier | Integer | Voyage tier (1-3) |
| voyage | String | Voyage identifier (e.g., "V58") |
| joinYear | Integer | Year the member joined (auto-calculated from timestamp) |
| timestamp | LocalDateTime | When the member joined |

## REST API Endpoints

### 1. Get All Members (with optional filtering)

```
GET /api/members
```

**Query Parameters (all optional):**
- `gender` - Filter by gender
- `country` - Filter by country
- `joinYear` - Filter by join year
- `roleType` - Filter by role type
- `role` - Filter by role
- `soloProjectTier` - Filter by solo project tier
- `voyageTier` - Filter by voyage tier
- `voyage` - Filter by voyage

**Example Requests:**

```bash
# Get all members
GET http://localhost:8080/api/members

# Filter by country
GET http://localhost:8080/api/members?country=United%20States

# Filter by multiple criteria
GET http://localhost:8080/api/members?roleType=Voyage&voyageTier=3&joinYear=2024

# Filter by gender and country
GET http://localhost:8080/api/members?gender=Female&country=Germany
```

**Response:**
```json
[
  {
    "id": 1,
    "gender": "Female",
    "country": "United States",
    "roleType": "Voyage",
    "role": "Developer",
    "soloProjectTier": null,
    "voyageTier": 3,
    "voyage": "V58",
    "joinYear": 2024,
    "timestamp": "2024-01-15T10:00:00"
  }
]
```

### 2. Get Member by ID

```
GET /api/members/{id}
```

**Example:**
```bash
GET http://localhost:8080/api/members/1
```

**Response:**
```json
{
  "id": 1,
  "gender": "Female",
  "country": "United States",
  "roleType": "Voyage",
  "role": "Developer",
  "soloProjectTier": null,
  "voyageTier": 3,
  "voyage": "V58",
  "joinYear": 2024,
  "timestamp": "2024-01-15T10:00:00"
}
```

### 3. Create New Member

```
POST /api/members
Content-Type: application/json
```

**Request Body:**
```json
{
  "gender": "Male",
  "country": "Spain",
  "roleType": "Voyage",
  "role": "UI/UX Designer",
  "voyageTier": 2,
  "voyage": "V58",
  "timestamp": "2024-03-01T14:30:00"
}
```

**Response:** Returns the created member with generated ID and joinYear.

### 4. Get Country Statistics

```
GET /api/members/stats/countries
```

Returns aggregated statistics by country with member counts and coordinates for map visualization.

**Example:**
```bash
GET http://localhost:8080/api/members/stats/countries
```

**Response:**
```json
[
  {
    "country": "United States",
    "memberCount": 2,
    "latitude": 37.0902,
    "longitude": -95.7129
  },
  {
    "country": "United Kingdom",
    "memberCount": 1,
    "latitude": 55.3781,
    "longitude": -3.4360
  }
]
```

## Sample Data

The application automatically initializes with 10 sample members on first startup:

1. Female from United States - Voyage Developer (V58, Tier 3, 2024)
2. Male from United Kingdom - Voyage Product Owner (V57, Tier 2, 2023)
3. Non-binary from Canada - Solo Project Developer (Tier 2, 2023)
4. Female from Germany - Voyage Developer (V56, Tier 1, 2023)
5. Male from India - Voyage Developer (V58, Tier 3, 2024)
6. Female from Australia - Solo Project Developer (Tier 3, 2022)
7. Male from Brazil - Voyage Scrum Master (V57, Tier 2, 2023)
8. Female from Nigeria - Voyage Developer (V55, Tier 1, 2023)
9. Male from United States - Solo Project Developer (Tier 1, 2024)
10. Female from France - Voyage UI/UX Designer (V56, Tier 2, 2023)

## Running the Application

### Prerequisites
- Java 17 or higher
- PostgreSQL database running
- Maven (or use the included Maven wrapper)

### Steps

1. **Set up the database:**
   - Create a PostgreSQL database
   - Update credentials in `application.properties`

2. **Build the project:**
   ```bash
   ./mvnw clean install
   # On Windows: mvnw.cmd clean install
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   # On Windows: mvnw.cmd spring-boot:run
   ```

4. **Or run the compiled JAR:**
   ```bash
   java -jar target/worldmap-backend-0.0.1-SNAPSHOT.jar
   ```

5. **Access the API:**
   - Base URL: `http://localhost:8080/api/members`
   - The sample data will be automatically loaded on first startup

## Testing the API

### Using cURL

```bash
# Get all members
curl http://localhost:8080/api/members

# Filter by country
curl "http://localhost:8080/api/members?country=United%20States"

# Get member by ID
curl http://localhost:8080/api/members/1

# Create new member
curl -X POST http://localhost:8080/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Female",
    "country": "Japan",
    "roleType": "Voyage",
    "role": "Developer",
    "voyageTier": 2,
    "voyage": "V58",
    "timestamp": "2024-02-15T10:00:00"
  }'

# Get country statistics
curl http://localhost:8080/api/members/stats/countries
```

### Using Postman

Import the following as a Postman collection or test the endpoints directly:
- GET: `http://localhost:8080/api/members`
- GET: `http://localhost:8080/api/members/1`
- POST: `http://localhost:8080/api/members` (with JSON body)
- GET: `http://localhost:8080/api/members/stats/countries`

## Filtering Examples

```bash
# Members from United States
GET /api/members?country=United%20States

# Female developers
GET /api/members?gender=Female&role=Developer

# Voyage members in tier 3
GET /api/members?roleType=Voyage&voyageTier=3

# Members who joined in 2024
GET /api/members?joinYear=2024

# Solo project members in tier 2
GET /api/members?roleType=Solo%20Project&soloProjectTier=2

# V58 voyage members
GET /api/members?voyage=V58

# Complex filter: Female voyage developers from 2024
GET /api/members?gender=Female&roleType=Voyage&role=Developer&joinYear=2024
```

## CORS Configuration

The API is configured with `@CrossOrigin(origins = "*")` to allow requests from any origin. For production, update this to specify your frontend URL:

```java
@CrossOrigin(origins = "http://your-frontend-domain.com")
```

## Database Schema

The `Member` table will be automatically created with the following structure:

```sql
CREATE TABLE members (
    id BIGSERIAL PRIMARY KEY,
    gender VARCHAR(255),
    country VARCHAR(255),
    role_type VARCHAR(255),
    role VARCHAR(255),
    solo_project_tier INTEGER,
    voyage_tier INTEGER,
    voyage VARCHAR(255),
    join_year INTEGER,
    timestamp TIMESTAMP
);
```

## Architecture

The application follows a standard layered architecture:

1. **Controller Layer** (`MemberController`):
   - Handles HTTP requests/responses
   - Validates input
   - Maps query parameters to filter objects

2. **Service Layer** (`MemberService`):
   - Contains business logic
   - Coordinates between controller and repository
   - Provides country statistics with coordinates

3. **Repository Layer** (`MemberRepository`):
   - Interfaces with the database
   - Uses JPA Specification for dynamic filtering
   - Provides custom queries for aggregation

4. **Entity Layer** (`Member`):
   - Represents database tables
   - Contains JPA annotations
   - Auto-calculates derived fields (joinYear)

## Features

✅ RESTful API with JSON responses  
✅ Dynamic filtering by multiple criteria  
✅ PostgreSQL database with JPA/Hibernate  
✅ Automatic schema generation  
✅ Sample data initialization  
✅ Country statistics with coordinates for map visualization  
✅ CORS enabled for frontend integration  
✅ Lombok for cleaner code  
✅ Standard Spring Boot layered architecture  


