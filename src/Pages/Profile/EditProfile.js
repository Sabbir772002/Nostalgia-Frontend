console.error('Failed to fetch user data');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    };

    fetchUserData();
  }, [username]);
   console.log(userData);
  // const [modelDetails,setModelDetails] = useState(
  //   {
  //     ModelName:user.first_name,
  //     ModelUserName:user.username,
  //     ModelCountryName:user.thana,
  //     ModelJobName:"Web Developer in Google"
  //   }
  // )
  
  console.log("bro");
  console.log(userPostData);

  return (
    <div className='interface'>
        <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        profileImg={profileImg}
        />
      <div className="home">
        <Left 
        following={following}
        setFollowing={setFollowing}
        profileImg={profileImg}
        modelDetails={modelDetails}
        
        />

        <EditPro/>
        
        <Right 
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        following={following}
        setFollowing={setFollowing}
        />
      </div>
    </div>
  )
}

export default EditProfile