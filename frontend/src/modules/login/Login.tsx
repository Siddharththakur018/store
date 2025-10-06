import React from 'react'

interface loginProps {
    switchToRegister: () => void
}

const Login:React.FC<loginProps> = ({switchToRegister}) => {
  return (
    <>
        <div>
            <div>
                <h1>thakurcart</h1>
                
            </div>
        </div>
    </>
  )
}

export default Login