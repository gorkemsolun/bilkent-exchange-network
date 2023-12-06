using System;
using System.Collections;
using System.Collections.Generic;
using bilkent_exchange_network_backend_trial.Model;
using MongoDB.Driver;
namespace bilkent_exchange_network_backend_trial.Service
{
    public class PostService : PostServiceInterface{
            private readonly IMongoCollection<Post> _collections; 
            public PostService(DatabaseSettings settings, IMongoClient mongoClient){
               var database =  mongoClient.GetDatabase(settings.DatabaseName);
               _collections = database.GetCollection<Post>(settings.PostCollectionName);
            }
            public List<Post> Get(){
                return _collections.Find(post => true).ToList();
            }

            public Post Get(string inpostId){
                return _collections.Find(post => post.PostId == inpostId ).FirstOrDefault();
            }

            public Post Create(Post newPost){
                _collections.InsertOne(newPost); 
                return newPost;
            }
            public void Update(string inpostId, Post post){
                _collections.ReplaceOne(post => post.PostId == inpostId, post );
            }
            public void Remove(string inpostId){
                _collections.DeleteOne(post => post.PostId == inpostId );
            }
    }

}