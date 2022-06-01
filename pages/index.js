import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa'
import { useState } from 'react'
import { generarJWT } from './api/login'
import { emailEx, passwordEx } from '../utils/regularExpretions'


export default function Home() {

  const [values, setValues] = useState({
    email:'',
    pass:'',
    token:''
  })

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [ target.name ]: target.value
    })
}

  const [msgErrorEmail, setMsgErrorEmail] = useState('')
  const [msgErrorPass, setMsgErrorPass] = useState([])

  const { email, pass, token } = values

  const emailValidator = () => {
      if( !emailEx.test(email.trim())){
        setMsgErrorEmail('Your email is not valid')
        return
      }
      
      setMsgErrorEmail('')
      return true
  }

  const passChecker = () => {
    let msg = []
    if (!pass.match(passwordEx.haveCapital) || 
        !pass.match(passwordEx.haveLower) || 
        !pass.match(passwordEx.havaNumber) || 
        !pass.match(passwordEx.haveSpecialCharacter) ||
         pass.trim().length < 8 ) {
      
      if( !pass.match(passwordEx.haveCapital) ) msg.push('Must contain at least 1 capital letter') 
      if( !pass.match(passwordEx.haveLower) ) msg.push('Must contain at least 1 lowercase letter')
      if( !pass.match(passwordEx.havaNumber) ) msg.push('Must contain at least 1 number')
      if( !pass.match(passwordEx.haveSpecialCharacter) ) msg.push('Must contain at least 1 special character')
      if ( pass.trim().length < 8 ) msg.push('Must be at least 8 characters long')
      
      setMsgErrorPass(msg)
      return
    }

    setMsgErrorPass([])
    return true
  }
  
  const onSubmit = ( e ) => {
    e.preventDefault()
    if ( emailValidator() && passChecker() ) {

      generarJWT(email).then(
        ( res ) => {
          setValues({
            ...values,
            email:'',
            pass:'',
            token: res
          })
        }
      )
    }else{
      console.log('no se puede iniciar sesion')
    }
  }
  
  return (
    <div className='body__container' style={{backgroundImage:'url(/img/bg1.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <section className='background' style={{backgroundImage:'url(/img/bg2.jpg)', backgroundSize: 'cover'}}>
        <h1>Hello</h1>
        <h2>Nice to see you again!</h2>
      </section>
      <section className='login__container'>
        <form className='login__form' onSubmit={ onSubmit }>
          <div className='greetings'>
            <h1>Login</h1>
          </div>

          <div className='input__container'>
            <div className="input">
              <input type="text" name="email" placeholder="" autoComplete='off' value={email} onChange={ handleInputChange } onKeyUp={ emailValidator }/>
              <label htmlFor='email-address' style={{ color: (msgErrorEmail.length > 0 ) ? '#DB4437' : '#2f80ed' }}>email</label>
              <div className='input__indicator' style={{ background: (msgErrorEmail.length > 0 ) ? '#DB4437' : '#2f80ed' }}></div>
            </div>
            <p className='err'>{ msgErrorEmail }</p>

          </div>

          <div className='input__container'>
            <div className="input">
              <input type="password" name="pass" placeholder="" value={ pass } onChange={ handleInputChange } onKeyUp={ passChecker }/>
              <label htmlFor='password' style={{ color: (msgErrorPass.length > 0 ) ? '#DB4437' : '#2f80ed' }}>password</label>
              <div className='input__indicator' style={{ background: (msgErrorPass.length > 0 ) ? '#DB4437' : '#2f80ed' }}></div>
            </div>
            <p className='err-pass'>{ msgErrorPass.map((msg, i) => <a key={i}>{msg}</a>) }</p>
          </div>

          <div className='controls'>

              <label className="remember">Remember
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            <div className='forgot'>
              <a href='#'>Forgot password?</a>
            </div>
          </div>

          <button type='submit'>Login</button>

          <div className='divider'>
            <p className='text'>Or Sign Up Using</p>
            <hr/>
          </div>

          <div className='login__social'>
            <a href='#'>
              <FaGoogle/>
            </a>
            <a href='#'>
              <FaFacebookF/>
            </a>
            <a href='#'>
              <FaTwitter/>
            </a>
          </div>
          <p style={{fontSize: '12px', wordBreak: 'break-all'}}>
            <b>JWT:</b> {token}
          </p>
          <div className="footer">
            <p>
              Don´t have an account? 
            </p>
        </div>
        </form>
      </section>
    </div>
  )
}
