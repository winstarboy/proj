import "./topbar.css";
import { Search, PersonSharp, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchResults,setSearchResults] = useState([])
  const [searchInput,setSearchInput] = useState('')
  
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

  const history = useHistory()
  function handleLogout() {
    localStorage.clear();
    history.push('/register');
    window.location.reload(true)
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Vuecom</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={e=>setSearchInput(e.target.value)}
          />
          <div >
             {searchResults.map(el =>{
                <p key={el._id}>{el.username}</p>
             } )}
          </div>
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
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      <Button 
      variant="inherit" 
      startIcon={< LogoutIcon />}
      size = "small" onClick={handleLogout}
      sx={{color: '#fffff'}}>
        LOGOUT
      </Button>
      </div>
    </div>
  );
}
