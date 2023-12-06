using bilkent_exchange_network.Server.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using bilkent_exchange_network.Server.Models;

namespace bilkent_exchange_network.Server.Services
{

    public class SecondhandServices 
    {
        private readonly IMongoCollection<SecondhandPost> _secondhandItems;

        public SecondhandServices(IOptions<SecondhandDatabaseSettings> options) {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            _secondhandItems = mongoClient.GetDatabase(options.Value.DatabaseName)
                            .GetCollection<SecondhandPost>(options.Value.SecondhandCollectionName);
        }

        //Get All Secondhand Items
        public async Task<List<SecondhandPost>> Get() => 
                        await _secondhandItems.Find(_ => true).ToListAsync(); 

        //Get the Secondhand item with the given ID
        public async Task<SecondhandPost> GetSecondhandPost(String PostID) =>
                        await _secondhandItems.Find(x => x.PostID == PostID ).FirstOrDefaultAsync();

        //Create a new Secondhand Item
        public async Task Create(SecondhandPost newSecondhandPost) =>
                        await _secondhandItems.InsertOneAsync(newSecondhandPost);

        //Update the item with the given ID
        public async Task Update(String postID,SecondhandPost secondhandPost) =>
                        await _secondhandItems.ReplaceOneAsync(x => x.PostID == postID, secondhandPost);

        //Remove the item with the given ID
        public async Task Remove(String postID) =>
                        await _secondhandItems.DeleteOneAsync(x => x.PostID == postID);


    }
}

