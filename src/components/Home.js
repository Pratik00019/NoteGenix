import { React } from 'react'
import Notes from './Notes'


const Home = (props) => {
  const {showalert}=props
  return (
    <div>
    
      <Notes showalert={showalert}></Notes>

    </div>

  )
}

export default Home