using MongoDB.Driver.Core.Configuration;

namespace bilkent_exchange_network_backend_trial.Model
{
    public interface PostInterface{
        string PostCollectionName {get;set;}
        string ConnectionString {get;set;}
        string DatabaseName{get;set;}
    }
}