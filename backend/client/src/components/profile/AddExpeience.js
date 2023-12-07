import {useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {addExperience} from "../redux/profile/action"

const AddExpeience = () => {

  const [experience,setExperience]=useState({
    title:'',
    company:'',
    location:'',
    from:'',
    current:false,
    to:'',
    description:''

  })

  const [toDateDisabled,toggleDisabled]=useState(false)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {title,from,to,current,company,location,description}=experience
  const handleChange=(e)=>{

    const {name,value}=e.target

    setExperience({...experience,[name]:value})
  }

  const handlesubmit=(e)=>{

    e.preventDefault()
   dispatch(addExperience(experience,navigate))
  }
  
  return (
    <>
    <section className="container">
    <h1 className="large text-primary">
     Add An Experience
    </h1>
    <p className="lead">
      <i className="fas fa-code-branch"></i> Add any developer/programming
      positions that you have had in the past
    </p>
    <small>* = required field</small>
    <form className="form" onSubmit={(e)=>handlesubmit(e)}>
      <div className="form-group">
        <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={(e)=>handleChange(e)} />
      </div>
      <div className="form-group">
        <input type="text" placeholder="* Company" name="company" required  value={company} onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="form-group">
        <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>handleChange(e)}  />
      </div>
      <div className="form-group">
        <h4>From Date</h4>
        <input type="date" name="from" value={from} onChange={(e)=>handleChange(e)}/>
      </div>
       <div className="form-group">
        <p><input type="checkbox" 
        name="current" 
        checked={current} 
        value={current}
        onChange={(e)=>{
          setExperience({...experience,current:!current});
          toggleDisabled(!toDateDisabled)}}
        /> {' '} Current Job</p>
      </div>
      <div className="form-group">
        <h4>To Date</h4>
        <input type="date" 
        name="to" value={to} 
        onChange={(e)=>handleChange(e)}
        disabled={toDateDisabled ? 'disabled' : ''}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Job Description"
          value={description} 
          onChange={(e)=>handleChange(e)}
        ></textarea>
      </div>
      <input type="submit" className="btn btn-primary my-1" />
      <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
    </form>
  </section>
  </>
  )
}

export default AddExpeience