import {GoogleLogin} from 'react-google-login'

const AuthGoogle = () => {
  const clientId = '113229342458-nffji5842i81t7sp50g08k4q044c8tj5.apps.googleusercontent.com'
  
  return(
      <div>
         <GoogleLogin
         className='google-login'
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={(res:any) => {
             console.log(res)
        }}
        onFailure={(res:any)=> {
          console.log(res.error)
        }}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      /> 
      
      </div>

  )
}

export default AuthGoogle