import { supabase } from "../client";
import { Link } from "react-router-dom";
import Card from "../components/Card";




const ViewCreator = () =>{

    const [creator, setCreators] = useState([]);
    

    console.log(creator)
    
    return(
        <>


        <h1> This is crators single view</h1>

        <Link to={`/edit/${creator.id}`} aria-label="Edit Creator">
          TESTING<PencilIcon className="icon" />
        </Link>

    
        
        
        
        </>
    )
}


export default ViewCreator;