import React from 'react'

function UserProps({user}) {
  return (
    <div>
        <h1>{user.email}</h1>
        <p>{user.name}</p>
    </div>
  )
}

export default UserProps