# SDLC Prompt Library: Retail POS (Modular Monolith)

## 1. Business & Discovery Prompts
**Goal:** Define the product's value proposition and target audience.

- **Feature Discovery:** "Act as a product manager for a retail POS. Analyze the needs of a small-scale boutique store for multi-tenant inventory management. Identify the top 5 must-have features for the first release."
- **User Persona Definition:** "Create 3 user personas for a POS system (Store Manager, Cashier, Admin). Detail their pain points and expectations for a modular monolith interface."

---

## 2. Design & Architecture Prompts
**Goal:** Generate HLD/LLD artifacts and visual representations.

- **System Flow Generation:** "Generate a Mermaid sequence diagram for the 'SalesCheckout' use case in a Modular Monolith architecture. Show interactions with Identity, Inventory, and Sales modules via MediatR bus."
- **UI Component Mockup:** "Act as a frontend designer. Generate a Tailwind CSS mockup for a POS dashboard showing real-time stock levels, recent transactions, and a 'Top Products' list for a specific tenant."

---

## 3. API & Development Prompts
**Goal:** Generate code and contracts.

- **Project Scaffolding:** "Generate a .NET 9 project structure for a Modular Monolith. Include a 'Shared' project, 'API' project, and 'Catalog' module project with Clean Architecture layers."
- **Model & Logic Gen:** "Generate a C# Domain Entity for 'Product' in the Catalog module. Include properties for TenantId, Price, and SKU. Add a 'UpdatePrice' method that publishes a 'PriceUpdated' domain event."

---

## 4. Testing & QA Prompts
**Goal:** Ensure reliability and correctness.

- **Unit Test Generation:** "Generate XUnit tests for the 'CreateProduct' command handler in the Catalog module. Use Moq to mock the IProductRepository and IMediator bus."
- **Integration Test Gen:** "Generate an integration test using WebApplicationFactory to test the POST /api/v1/catalog/products endpoint. Ensure the TenantId is correctly resolved from the header."

---

## 5. Deployment & CI/CD Prompts
**Goal:** Automate release and observability.

- **Dockerization:** "Generate a multi-stage Dockerfile for the Retail POS .NET 9 API. Optimize for size and include diagnostic tools like 'dotnet-counters'."
- **GitHub Action Gen:** "Create a GitHub Action workflow to build, test, and deploy the Modular Monolith to Google Cloud Run. Include steps for database migration using 'ef migrations'."

---

## 6. End-to-End Prompt Flow (Full SDLC)
1. **Discover:** "Define the business rules for a POS discount engine."
2. **Design:** "Create the DB schema and class diagram for these rules."
3. **API:** "Generate the MediatR command and handler for 'ApplyDiscountToOrder'."
4. **Test:** "Write the unit tests for the discount calculation logic."
5. **Deploy:** "Write the K8s manifest for this module's container."
