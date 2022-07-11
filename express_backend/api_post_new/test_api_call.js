import fs from 'fs'


// RUN THIS ON YOUR LOCAL TERMINAL WITH "node test.js"

 // Example POST method implementation:
 async function postData(url = '', data = {}) {
 
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json(); 
  }
  
  //var fs = require('fs')

  // YOU HAVE TO PROVIDE A TEST FILE BY THE NAME OF "test.mp3" IN THIS FODLER
  let audioBuffer = Buffer.from(fs.readFileSync('./test.mp3')).toString('base64')
  

            // or http://194.94.204.27:10095/api_post_new
  postData('http://194.94.204.27:10095/api_post_new', {name: 'test', typeOfPost: 'audio', type:'audio', author: 'bigjohn', audiodata: audioBuffer})
    .then(data => {
      console.log(data); 
    });
  
  
