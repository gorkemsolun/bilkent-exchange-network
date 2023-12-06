namespace bilkent_exchange_network_backend_trial.Model
{
    public class DatabaseSettings : PostInterface
    {
        public string PostCollectionName {get;set;}
        public string ConnectionString {get;set;}
        public string DatabaseName{get;set;}
    }
}