import React from 'react'
import UserDetails from './UserDetails'
import UserDetailsProfile from './UserDetailsProfile'
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams();
  return (
    <div>

        <UserDetailsProfile id={id} />
        <UserDetails id={id} />

    </div>
  )
}

export default UserProfile