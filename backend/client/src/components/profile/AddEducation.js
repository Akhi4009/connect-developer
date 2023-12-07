import {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { addEducation } from '../redux/profile/action'

const AddEducation = () => {

  const [education,setEducation]=useState({

    school:'',
    degree:'',
    fieldofstudy:'',
    from:'',
    current:false,
    to:'',
    description:''

  })

  const [toDateDisabled,toggleDisabled]=useState(false)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleChange=(e)=>{

    const {name,value}=e.target

    setEducation({...education,[name]:value})
  }

  const handlesubmit=(e)=>{
  e.preventDefault()
   dispatch(addEducation(education,navigate))
  }

  const {school,from,to,current,fieldofstudy,degree,description}=education
  return (
    <>
    <section className="container">
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>handlesubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school} onChange={(e)=>handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree} onChange={(e)=>handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={(e)=>handleChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>handleChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox"
             name="current" checked={current} 
             value={current}
             onChange={(e)=>{
              setEducation({...education,current:!current});
              toggleDisabled(!toDateDisabled)}}
             
             /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date"
          name="to"
          value={to}
          onChange={(e)=>handleChange(e)}
          disabled={toDateDisabled ? 'disabled' : ''}
           />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(e)=>handleChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
    </section>
    </>
  )
}

export default AddEducation