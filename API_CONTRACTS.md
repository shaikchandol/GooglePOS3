# API Contracts: Retail POS (Modular Monolith)

## 1. Catalog Module APIs
**Endpoint:** `POST /api/v1/catalog/products`
**Auth Required:** Yes (Role: Manager)
**Request Body:**
```json
{
  "name": "IPhone 15 Pro",
  "category": "Electronics",
  "price": 999.0,
  "sku": "IP15P-BLK-128"
}
```
---
**Endpoint:** `GET /api/v1/catalog/products/{id}`
**Auth Required:** Yes
**Response Body:**
```json
{
  "id": "guid",
  "name": "IPhone 15 Pro",
  "sku": "IP15P-BLK-128",
  "price": 999.0,
  "stockLevel": 15
}
```

---

## 2. Inventory Module APIs
**Endpoint:** `PATCH /api/v1/inventory/adjust/{productId}`
**Auth Required:** Yes (Role: Staff)
**Request Body:**
```json
{
  "adjustment": 10,
  "reason": "Stock Refresh"
}
```

---

## 3. Sales Module APIs
**Endpoint:** `POST /api/v1/sales/checkout`
**Auth Required:** Yes
**Request Body:**
```json
{
  "items": [
    { "productId": "guid", "quantity": 1 }
  ],
  "paymentMethod": "CreditCard"
}
```
**Response Body:**
```json
{
  "orderId": "guid",
  "total": 999.0,
  "status": "Completed"
}
```

# Database Schema: Retail POS

## 1. Core Models (PostgreSQL)

### 1.1 Tenants Table
```sql
CREATE TABLE Tenants (
    Id UUID PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Subdomain VARCHAR(100) UNIQUE NOT NULL,
    ConnectionString TEXT, -- For isolated DB scaling
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 1.2 Products Table (Catalog Module)
```sql
CREATE TABLE Products (
    Id UUID PRIMARY KEY,
    TenantId UUID REFERENCES Tenants(Id),
    Name VARCHAR(255) NOT NULL,
    SKU VARCHAR(100) UNIQUE NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    CategoryId UUID,
    IsActive BOOLEAN DEFAULT TRUE
);
```

### 1.3 Inventory Table (Inventory Module)
```sql
CREATE TABLE StockLevels (
    Id UUID PRIMARY KEY,
    TenantId UUID REFERENCES Tenants(Id),
    ProductId UUID REFERENCES Products(Id),
    LocationId UUID, -- Multi-location support
    Quantity INT DEFAULT 0,
    LastUpdated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 1.4 Orders Table (Sales Module)
```sql
CREATE TABLE Orders (
    Id UUID PRIMARY KEY,
    TenantId UUID REFERENCES Tenants(Id),
    CustomerId UUID,
    TotalAmount DECIMAL(18,2) NOT NULL,
    TaxAmount DECIMAL(18,2) NOT NULL,
    Status VARCHAR(50) DEFAULT 'Pending',
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE OrderItems (
    Id UUID PRIMARY KEY,
    OrderId UUID REFERENCES Orders(Id),
    ProductId UUID REFERENCES Products(Id),
    Quantity INT NOT NULL,
    PriceAtOrder DECIMAL(18,2) NOT NULL
);
```

---

## 2. Indexing Strategy
- **`TenantId` Index**: Every table will have an index on `TenantId` for fast retrieval during multitenancy filtering.
- **`SKU` Unique Index**: In the `Products` table to prevent duplicates within a tenant.
- **`OrderId` Index**: In `OrderItems` to optimize lookup.
