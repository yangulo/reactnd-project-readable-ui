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

export const getAll = () =>
 fetch(`${api}/posts`, { headers })
  .then(res => res.json())
  .catch(function (error) {  
    console.log('Request failed', error);  
  });

export const getUniquePost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
   .then(res => res.json())
   .catch(function (error) {  
     console.log('Request failed', error);  
  });

export const save = (post) =>
  fetch(`${api}/posts`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(post)
    }).then(res => res.json())
    .catch(function (error) {
        console.log('Request failed', error);  
  });

  export const upVote = (id) =>
  fetch(`${api}/posts/${id}`, { 
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
  fetch(`${api}/posts/${id}`, { 
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

export const update = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({title:title, body:body})
   }).then(res => res.json())
   .catch(function (error) {
       console.log('Request failed', error);  
  });

  export const removePost = (id) =>
  fetch(`${api}/posts/${id}`, {
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
