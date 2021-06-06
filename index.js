// npm install googleapis

const {google} = require('googleapis');

async function main() {

const authClient = new google.auth.OAuth2({
    clientId: "",
    clientSecret: "" ,
  });
  
authClient.setCredentials({
    refresh_token: "",
  });

  const youtube = google.youtube({
    auth: authClient,
    version: 'v3',
  });

  const videoId = '';

  const videoResult = await youtube.videos.list({
    id: videoId,
    part: 'snippet,statistics',
  });

  const {statistics, snippet} = videoResult.data.items[0];

   const newTitle = `This video has (Views: ${statistics.viewCount}, Likes: ${statistics.likeCount})`;


  if (snippet.title !== newTitle) {
    snippet.title = newTitle;

  
    await youtube.videos.update({
      part: 'snippet',
      requestBody: {
        id: videoId,
        snippet,
      },
    });
  }
}



setInterval(function() {
  main()
}, 60 * 1000); 


