"use client"

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";


import Profile from '@components/Profile'
const MyProfile = () => {

  const router = useRouter()

  const { data: session } = useSession()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if(session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (posts) => {
    router.push(`/update-prompt?id=${posts._id}`)
  }

  const handleDelete = async (posts) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${posts._id.toString()}`, {
          method: 'DELETE'
        });

        const fillteredPosts = posts.filter((p) => p._id !== posts._id)

        setPosts(fillteredPosts)
      } catch(error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personlized prfoile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile