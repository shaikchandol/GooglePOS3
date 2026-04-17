using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RetailPos.Modules.Catalog;
using RetailPos.Shared;

var builder = WebApplication.CreateBuilder(args);

// Add Shared Kernel & Cross-Cutting Concerns (Auth, Tenancy)
builder.Services.AddSharedKernel();

// Register Modules
builder.Services.AddCatalogModule(builder.Configuration);
// builder.Services.AddInventoryModule(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
