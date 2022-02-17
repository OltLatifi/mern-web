import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password: '',
    password2: ','
  })
  const {email, password} = formData

  function onChange(e) {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  function onSubmit() {

  }
  return (
    <div>
      <section className="heading">
        <h1><FaSignInAlt/> Login</h1>
        <p>Enter your credentials</p>
      </section>
      <section className="form">
        <form>
          <div className="form-group">
            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange}/>
          </div>
          <div className="form-group">
            <button className="btn btn-block" onSubmit={onSubmit}>Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login