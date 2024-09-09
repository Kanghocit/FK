import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom";
import useShowToast from '../hooks/useShowToast';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error")
      }
    };
    getUser();
  }, [username, showToast]);
  if (!user) return null;
  return (
    <>
      <UserHeader user={user} />
      <UserPost likes={1200} replies={481} postImg={"/post1.png"} postTitle={"Post1"} />
      <UserPost likes={450} replies={81} postImg={"/post2.png"} postTitle={"Post2"} />
      <UserPost likes={123} replies={41} postImg={"/post3.png"} postTitle={"Post3"} />
      <UserPost likes={150} replies={48} postTitle={"Post4"} />


    </>
  )
}

export default UserPage