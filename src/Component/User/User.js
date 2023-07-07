import React from 'react'

const User = ({ user }) => {
    console.log("🤔🤔🤔 ~ file: User.js:4 ~ User ~ user:", user)
    return (
        <div>{user?.userName}</div>
    )
}

export default User