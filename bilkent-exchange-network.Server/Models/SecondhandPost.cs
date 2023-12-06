namespace bilkent_exchange_network.Server.Models
{
    public class SecondhandPost : Post {

        public SecondhandPost(User user, 
                                String title, 
                                String category,
                                DateOnly SendDate,
                                Double price) : base(user, title, category, SendDate) {

            Price = price;
        }

        public Double Price{
            get;
            set;
        }


    }
}

