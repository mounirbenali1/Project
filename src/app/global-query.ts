import gql from 'graphql-tag';



export const getAllTasks = gql`
{
  users{
    username,
    tweetText,
    hashtags,
    noOfRetweets,
    noOfRetweets,
    noOfReplies
  }
}`;



export const getSentiment = gql`
{
  users{
    sentiment
  }
}`;

export const getSentiment1 = gql`
{
  GeorgeSen{
    sentiment
  }
}`;


export const getHashtags = gql`{Hashtags{
  hashtags,
  Country,
  noOfRetweets,
  numberOfLikes,
  noOfReplies,
  tweetTime
}
}`;