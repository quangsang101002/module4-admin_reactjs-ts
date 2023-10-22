import React from "react";
import styles from "./Header.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import authAPI from "../../apis/auth/auth/requests/author.api";
import { useState, useEffect } from "react";
function Header() {
  const [avatar, setAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuth();
      setAvatar(response.avatar);
      setUsername(response.username);
      setUserId(response.id);
    } catch (error) {}
  };
  return (
    <header className={styles.wrapper}>
      <div className={styles.menu}>
        <GiHamburgerMenu />
      </div>

      <div className={styles.infoAdmin}>
        <div className={styles.avatar}>
          <img
            src="https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg"
            alt="avatar"
          ></img>
        </div>
        <div className={styles.user}>{username}</div>
      </div>
    </header>
  );
}

export default Header;
