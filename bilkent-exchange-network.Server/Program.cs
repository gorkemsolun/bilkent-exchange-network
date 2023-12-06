using bilkent_exchange_network.Server.Data;
using bilkent_exchange_network.Server.Services;
using bilkent_exchange_network.Server.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.Configure<SecondhandDatabaseSettings>
(builder.Configuration.GetSection("SecondhandItemsDatabaseSettings"));

builder.Services.AddSingleton<SecondhandServices>();


// Add services to the container.


builder.Services.AddControllers();


var app = builder.Build();

app.MapGet("/", () => "Secondhand API");

app.MapPost("/api/secondhandItems", async (SecondhandServices secondHandServices, SecondhandPost post) =>
{
    await secondHandServices.Create(post);
    return Results.Ok();
});

app.Run();
