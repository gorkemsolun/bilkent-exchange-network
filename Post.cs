
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System; 
namespace bilkent_exchange_network_backend_trial.Model
{   [BsonIgnoreExtraElements]
    public class Post{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] // type conversion
         public string title{get; set; } = String.Empty;
        [BsonElement("category")]
         public string category{get; set; } = String.Empty;
        [BsonElement("PostId")]
        public string PostId{get; set; } = String.Empty;
        [BsonElement("sendDate")]
        public string sendDate{get; set; } = String.Empty;
        [BsonElement("content")]
        public string content{get; set; } = String.Empty;
    }   
}