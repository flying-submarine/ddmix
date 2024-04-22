import { Routes, Route,Navigate} from 'react-router-dom'
import LayoutContent from '@/layouts/index'

const APP = () =>{
  return (
    <Routes>
      <Route path='/' element={<LayoutContent/>}>
      </Route>
      <Route path='*' element={<Navigate replace to="/" />}/>
    </Routes>
  )
} 
export default APP

