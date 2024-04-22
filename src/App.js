import { Routes, Route,Navigate} from 'react-router-dom'
import LayoutContent from '@/layouts/index'

const APP = () =>{
  return (
    <Routes>
      <Route path='/talk' element={<LayoutContent/>}>
      </Route>
      <Route path='*' element={<Navigate replace to="talk" />}/>
    </Routes>
  )
} 
export default APP

