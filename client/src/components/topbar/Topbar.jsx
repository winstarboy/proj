import "./topbar.css";
import { Search, PersonSharp, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  useEffect(() => {
    const getallusers = async () => {
      try {
        const getalluser = await axios.get(`/users/allusers?username=${searchInput}`);
        setSearchResults(getalluser.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getallusers();
  }, [searchInput]);

  const history = useHistory();
  function handleLogout() {
    localStorage.clear();
    history.push("/register");
    window.location.reload(true);
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Vuecom</span>
        </Link>
      </div>
      <div className="topbarCenter" style={{ position: "relative" }}>
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onFocus={() => setIsTouched((prev) => !prev)}
            // onBlur={() => setIsTouched((prev) => !prev)}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {searchResults.length > 0 && isTouched && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                background: "white",
                width: "100%",
              }}
            >
              {searchResults.map(function (el) {
                let link = `http://localhost:3000/profile/${el.username}`;
                return (
                  <p key={el._id}>
                    <a href={link}> {el.username}</a>
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonSharp />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <Button
          variant="inherit"
          startIcon={<LogoutIcon />}
          size="small"
          onClick={handleLogout}
          sx={{ color: "#fffff" }}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
}
