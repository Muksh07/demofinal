using Microsoft.OpenApi.Models;
using todoappbackend.Database;
using todoappbackend.Functionality;
using todoappbackend.Service;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<DatabaseContext>();
builder.Services.AddTransient<IUserfunctionality, UserOperations>();
builder.Services.AddTransient<ITaskfunctionality, TaskOperations>();


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddCors();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors(x => x
.AllowAnyHeader()
.AllowAnyMethod()
.AllowAnyOrigin()
);


app.Run();

