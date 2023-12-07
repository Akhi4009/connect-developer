import React from 'react'
import {useDispatch} from "react-redux"
import Moment from "react-moment"
import { deleteEducation } from '../redux/profile/action'

const Educations = ({education}) => {

    
   
    const dispatch=useDispatch()
   

  return (
    <>
    <h2 className="my-2">Education Credentials</h2>
      <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
          {education && education.map(edu=>(

            <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td className="hide-sm">
              <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
              {edu.to===null ?(' Now ') :(
                <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
              )}
            </td>
            <td>
              <button className="btn btn-danger" onClick={(id)=>dispatch(deleteEducation(edu._id))}>
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

export default Educations