import Authorisation from "../component/Authorisation";

const Welcome=()=>{
  return <><div class="container px-4 py-5" id="featured-3">
  <div class="row g-4 py-5 row-cols-1 row-cols-lg-3" >
    <Authorisation data={"Student Portal"}/>
    <Authorisation data={"Teacher Portal"}/>
  </div>
</div></>
}
export default Welcome;