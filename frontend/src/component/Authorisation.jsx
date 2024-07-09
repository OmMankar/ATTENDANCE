import { Link } from 'react-router-dom';
import styles from './Authorisation.module.css'

const Authorisation=({data})=>{
 
  return <>
    <div className={`feature col ${styles}`}>
        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
         
        </div>
        <h3 class="fs-2 text-body-emphasis">{data}</h3>
        {/* //depends on the data */}
       {data==="Student Portal" && <img src="./student.png" alt="" />}
       {data==="Teacher Portal" && <img src="./teacher.png" alt="" /> }

       {data==="Student Portal" && <Link to={'/student'} class="icon-link">
          Call to action
          <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
        </Link>}
       {data==="Teacher Portal" && <Link to={'/teacher'} class="icon-link">
          Call to action
          <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
        </Link>}
        
      </div>
  </>
}
export default Authorisation;