const api = "http://localhost:3001"

// Generate a unique token for storing your posts data on the backend server.
let token = localStorage.token
if (!token)
  token = 'whatever-you-want'
  //token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
}

export const getComments = (parentId) =>
 fetch(`${api}/posts/${parentId}/comments`, { headers })
  .then(res => res.json())
  .catch(function (error) {  
    console.log('Request failed', error);  
 });

export const save = (comment) =>
  fetch(`${api}/comments`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(comment)
    }).then(res => res.json())
    .catch(function (error) {
        console.log('Request failed', error);  
  });

  export const upVote = (id) =>
  fetch(`${api}/comments/${id}`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({option: 'upVote'})
    }).then(res => res.json())
    .catch(function (error) {
        console.log('Request failed', error);  
  });

  export const downVote = (id) =>
  fetch(`${api}/comments/${id}`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({option: 'downVote'})
    }).then(res => res.json())
    .catch(function (error) {
        console.log('Request failed', error);  
  });

  export const update = (id, timestamp, body) =>
  fetch(`${api}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({timestamp:timestamp, body:body})
   }).then(res => res.json())
   .catch(function (error) {
       console.log('Request failed', error);  
  });

  export const removeComment = (id) =>
    fetch(`${api}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({deleted: true})
    }).then(res => res.json())
    .catch(function (error) {
    console.log('Request failed', error);  
  });

