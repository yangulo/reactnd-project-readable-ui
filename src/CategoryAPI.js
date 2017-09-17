const api = "http://localhost:3001"

// Generate a unique token for storing your categories data on the backend server.
let token = localStorage.token
if (!token)
  token = 'whatever-you-want'
  //token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
}

export const getAll = () =>
 fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)
  .catch(function (error) {  
    console.log('Request failed', error);  
  });

export const getPost = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
   .then(res => res.json())
   .catch(function (error) {  
     console.log('Request failed', error);  
   });
 