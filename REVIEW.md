# Architecture Review: Modular Monolith Retail POS

## Slide 1: Project Overview
* **Objective:** Design a scalable, multi-tenant POS system.
* **Architecture:** Modular Monolith (Modulith).
* **Stack:** .NET 9+, PostgreSQL, MediatR.
* **Paradigm:** Domain-Driven Design (DDD).

## Slide 2: High-Level Architecture (HLD)
* **Modularization:** Physical separation of modules via .NET projects.
* **Shared Kernel:** Core abstractions and cross-cutting concerns (Auth, Tenancy).
* **Host Application:** Single executable for easier deployment and monitoring.

## Slide 3: Module Design (LLD)
* **Inner Layer:** Domain entities and logic (Business Rules).
* **Outer Layer:** Application use cases (MediatR Commands/Queries).
* **Infrastructure Layer:** Persistence, external API integrations.
* **Independent DB Contexts:** Each module owns its own table set.

## Slide 4: Multi-Tenancy Strategy
* **Logical Isolation:** Shared Database, Shared Schema (`TenantId`).
* **Tenant Middleware:** Resolves tenant context on every request.
* **Global Query Filters:** Automatically filters lists/lookups by `TenantId`.

## Slide 5: Communication Design
* **In-Process:** MediatR notifications for decoupled event handling.
* **Synchronous:** Forbidden between modules (use Shared Interfaces if absolutely necessary).
* **Atomicity:** Achieved via an "Outbox Pattern" if transacting across module boundaries.

## Slide 6: Tech Stack & Tools
* **Language:** C# 13 / .NET 9.
* **ORM:** Entity Framework Core.
* **Validation:** FluentValidation.
* **Mapping:** Mapster.
* **Docs:** Swagger UI + Scalar.

## Slide 7: Roadmap
* **Ph 1:** Core modules (Identity, Catalog).
* **Ph 2:** Transactional modules (Sales, Inventory).
* **Ph 3:** Global reporting and analytics.
* **Future:** Ability to extract high-load modules (e.g., Sales) into independent microservices.

## Slide 8: Q&A
* Open for discussion on isolation vs. performance.
