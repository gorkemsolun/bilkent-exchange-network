using System.Collections.Generic;
using bilkent_exchange_network_backend_trial.Model;
namespace bilkent_exchange_network_backend_trial.Service
{
    public interface PostServiceInterface
    {
        List<Post> Get(); 
        Post Get(string postId);
        Post Create(Post newPost);
        void Update(string postId, Post post);
        void Remove(string id); 
    }
}