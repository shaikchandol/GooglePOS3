# Module Designs: Retail POS (HLD & LLD)

## 1. High-Level Design (HLD)
### Global System Flow (Module Interactions)
```mermaid
graph LR
    User([User/ClientApp]) --> API[API Host]
    API --> Tenants[Tenant Middleware]
    Tenants --> Modules{Modules List}

    subgraph "Retail Modules"
        Modules --> Identity[Identity Module]
        Modules --> Catalog[Catalog Module]
        Modules --> Inventory[Inventory Module]
        Modules --> Sales[Sales Module]
        Modules --> Reporting[Reporting Module]
    end

    Identity -.->|Event: UserCreated| Catalog
    Catalog -.->|Event: ProductUpdated| Inventory
    Sales -.->|Event: OrderPlaced| Inventory
    Sales -.->|Event: OrderPlaced| Reporting
```

---

## 2. Low-Level Designs (LLD) by Module

### 2.1 Catalog Module LLD
**Internal Flow:**
```mermaid
sequenceDiagram
    participant C as Controller
    participant M as MediatR
    participant CH as CreateProductHandler
    participant E as ProductEntity
    participant R as ProductRepository
    participant B as EventBus (MediatR Notifications)
    
    C->>M: Send CreateProductCommand
    M->>CH: Dispatch to Handler
    CH->>E: Instantiate Product
    CH->>R: AddAsync(Product)
    R->>R: Save Changes (PostgreSQL)
    CH->>B: Publish ProductCreatedNotification
    B->>M: Broadcast event to other modules
    CH->>C: Return ProductCreatedResult (DTO)
```

---

### 2.2 Inventory Module LLD
**Internal Flow (Handling Product Updates):**
```mermaid
sequenceDiagram
    participant EB as MediatR Notification Bus
    participant IH as SyncProductInventoryHandler
    participant DB as InventoryDbContext
    participant S as StockEntity

    EB->>IH: Receive ProductCreatedNotification
    IH->>S: Create Initial Stock Record
    S->>S: Set quantity = 0
    IH->>DB: AddAsync(Stock)
    DB->>DB: Save Changes
    Note right of IH: Product is now ready for stock adjustments
```

---

### 2.3 Sales Module LLD
**Internal Flow (Transaction Management):**
```mermaid
sequenceDiagram
    participant C as CheckoutController
    participant S as SalesService
    participant V as PriceValidator (Shared interface or internal)
    participant T as TransactionManager
    participant DB as SalesDbContext

    C->>S: ProcessCheckout(OrderDto)
    S->>V: Validate Prices & Availability
    S->>T: BeginTransaction()
    S->>DB: AddAsync(Order)
    S->>DB: AddAsync(OrderItems)
    T->>T: Commit()
    S->>S: Publish OrderPlacedNotification
    S-->>C: Return OrderConfirmation
```

---

## 3. Technology Alignment
Each module is implemented as a standalone .NET 9 project following the "Vertical Slice" pattern. This ensures that a bug in the `Catalog` module doesn't bring down the `Sales` module if they were deployed as independent services later.
