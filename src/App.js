import { useEffect, useState } from "react";


function App() {

  const [users, setUsers] = useState(false)
  const [name, setName] = useState('Ali Rıza')
  const [avatar, setAvatar] = useState(false)

  const addPost = data => {

    const headers = new Headers()
    //headers.append('Content-type', 'application/json')

    const formData = new FormData()
    formData.append('userId', data.userID)
    formData.append('title', data.title)
    formData.append('body', data.body)

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      //body: JSON.stringify(data),
      body: formData,
      headers
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      if (res.ok && res.status == 200) {
        return res.json()
      }
    })
    .then(data => setUsers(data))
    .catch(err => console.log(err))

    addPost({
      userID: 1,
      title: 'ÖRNEK POST',
      body: 'Post İçeriği'
    })

  }, []);

  const submitHandle = e => {
    e.preventDefault()
    console.log('Submit Edildi !!!')
  }

  return(
    <>
      <form onSubmit={submitHandle}>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}></input><br></br>
        <input type="file" name="avatar" onChange={e => setAvatar(e.target.files[0])}></input><br></br>
        <button type="submit" disabled={!name || !avatar}>Kaydet</button>
      </form>

      <h1>Kullanıcı Listesi</h1>
      <ul>
      {users && users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>

    </>
  );
}

export default App;