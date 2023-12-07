import React from 'react'
import { useDispatch } from 'react-redux';
import Moment from "react-moment"
import { deleteExperience } from '../redux/profile/action';


const Experiences = ({experience}) => {
    
    
    const dispatch=useDispatch()
  return (
    <>
    <h2 className="my-2">Experience Credentials</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th></th>
        </tr>
      </thead>
      <tbody>

      {experience && experience.map(exp=>(

        <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
          {exp.to===null ?(' Now ') :(
            <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger" onClick={(id)=>dispatch(deleteExperience(exp._id))}>
            Delete
          </button>
        </td>
      </tr>
      ))}
       
        </tbody>
        </table>
    </>
  )
}

export default Experiences