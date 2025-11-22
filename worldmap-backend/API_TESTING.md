# API Testing Examples

This file contains example HTTP requests for testing the Chingu Member Demographics Map API.

## Base URL
```
http://localhost:8080/api/members
```

---

## 1. Get All Members

### Request
```http
GET http://localhost:8080/api/members
```

### Expected Response (200 OK)
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
  },
  // ... more members
]
```

---

## 2. Filter by Country

### Request
```http
GET http://localhost:8080/api/members?country=United%20States
```

### Expected Response (200 OK)
Returns only members from United States

---

## 3. Filter by Multiple Criteria

### Request
```http
GET http://localhost:8080/api/members?roleType=Voyage&voyageTier=3&joinYear=2024
```

### Expected Response (200 OK)
Returns members who are in Voyage projects, tier 3, who joined in 2024

---

## 4. Filter by Gender and Role

### Request
```http
GET http://localhost:8080/api/members?gender=Female&role=Developer
```

### Expected Response (200 OK)
Returns female developers

---

## 5. Get Member by ID

### Request
```http
GET http://localhost:8080/api/members/1
```

### Expected Response (200 OK)
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

### Expected Response (404 Not Found)
When member doesn't exist

---

## 6. Create New Member

### Request
```http
POST http://localhost:8080/api/members
Content-Type: application/json

{
  "gender": "Male",
  "country": "Japan",
  "roleType": "Voyage",
  "role": "Developer",
  "voyageTier": 2,
  "voyage": "V58",
  "timestamp": "2024-03-01T14:30:00"
}
```

### Expected Response (201 Created)
```json
{
  "id": 11,
  "gender": "Male",
  "country": "Japan",
  "roleType": "Voyage",
  "role": "Developer",
  "soloProjectTier": null,
  "voyageTier": 2,
  "voyage": "V58",
  "joinYear": 2024,
  "timestamp": "2024-03-01T14:30:00"
}
```

---

## 7. Get Country Statistics

### Request
```http
GET http://localhost:8080/api/members/stats/countries
```

### Expected Response (200 OK)
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
  },
  {
    "country": "Canada",
    "memberCount": 1,
    "latitude": 56.1304,
    "longitude": -106.3468
  }
]
```

---

## Filter Combinations

### Voyage members in tier 3
```http
GET http://localhost:8080/api/members?roleType=Voyage&voyageTier=3
```

### Solo project members in tier 2
```http
GET http://localhost:8080/api/members?roleType=Solo%20Project&soloProjectTier=2
```

### V58 voyage members
```http
GET http://localhost:8080/api/members?voyage=V58
```

### Members from India
```http
GET http://localhost:8080/api/members?country=India
```

### Members who joined in 2023
```http
GET http://localhost:8080/api/members?joinYear=2023
```

### Female voyage developers from 2024
```http
GET http://localhost:8080/api/members?gender=Female&roleType=Voyage&role=Developer&joinYear=2024
```

---

## cURL Commands

### Get all members
```bash
curl http://localhost:8080/api/members
```

### Filter by country
```bash
curl "http://localhost:8080/api/members?country=United%20States"
```

### Get member by ID
```bash
curl http://localhost:8080/api/members/1
```

### Create new member
```bash
curl -X POST http://localhost:8080/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Female",
    "country": "Spain",
    "roleType": "Voyage",
    "role": "UI/UX Designer",
    "voyageTier": 2,
    "voyage": "V58",
    "timestamp": "2024-02-20T09:00:00"
  }'
```

### Get country statistics
```bash
curl http://localhost:8080/api/members/stats/countries
```

---

## PowerShell Commands (Windows)

### Get all members
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/members" -Method Get
```

### Filter by country
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/members?country=United%20States" -Method Get
```

### Create new member
```powershell
$body = @{
    gender = "Female"
    country = "Spain"
    roleType = "Voyage"
    role = "UI/UX Designer"
    voyageTier = 2
    voyage = "V58"
    timestamp = "2024-02-20T09:00:00"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/members" -Method Post -Body $body -ContentType "application/json"
```

---

## Notes

- All filter parameters are optional and can be combined
- String parameters should be URL-encoded (spaces as `%20`)
- The `timestamp` field automatically generates the `joinYear`
- Country statistics include latitude/longitude for map visualization
- API returns empty array `[]` if no members match the filter criteria

