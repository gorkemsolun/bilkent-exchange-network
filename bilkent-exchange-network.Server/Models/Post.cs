using MongoDB.Bson.Serialization.Attributes;

namespace bilkent_exchange_network.Server{

public class Post{
    
    public Post(User user, String title, String category, DateOnly SendDate) {
        this.user = user;
        Title = title;
        Category = category;
        sendDate = SendDate;
    }
    private User user;
    public User User {
        get { return user;} 
    }

    public String Title {get; set;}

    public String Category {get; set;}

    private DateOnly sendDate;
    public DateOnly SendDate {
        get {return sendDate;}
    }

    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    private readonly String postID;
    public String PostID {
        get {return postID;}
    }

}


}

