import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGithubRepos } from '../redux/profile/action'
import Spinner from '../layout/Spinner'
const ProfileGithub = ({username}) => {
    
    const dispatch=useDispatch()

    const {repos,isLoading,error} = useSelector(state=>state.profileReducer)
    // console.log(repos)
    useEffect(()=>{

        dispatch(getGithubRepos(username))
    },[dispatch,username])
  return (
    <>
    <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
         
          {error.status===404}{
            <h4 className='text text-primary'>No Github profile found</h4>
          }
          {isLoading ? <Spinner/> :(
            repos.map(repo=>(

                <div key={repo.name} className="repo bg-white p-1 my-1">
            <div>
              <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
                {repo.description}
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count} </li>
                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
            ))
          )}
          
         
        </div>
    </>
  )
}

export default ProfileGithub