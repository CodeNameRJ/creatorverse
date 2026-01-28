import { useEffect, useState } from "react";
import Card from "../components/Card";
import { supabase } from "../client";
import { Link } from "react-router-dom";




const ShowCreators = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    console.log(creators[0]);

    useEffect(() => {
        const fetchCreators = async () => {
        setLoading(true);
        setErrorMsg("");
        
        const { data: creatorsData, error } = await supabase
            .from("creators")
            .select()
            .order("id", { ascending: true });

            console.log("data:", creatorsData);
            console.log("error:", error);

        if (error) {
            setErrorMsg(error.message);
            setCreators([]);
        } else {
            setCreators(creatorsData ?? []);
        }

        setLoading(false);
    };

    fetchCreators();
    }, []);

      

  if (loading) return <p>Loading creators...</p>;

  if (errorMsg) return <p>Error: {errorMsg}</p>;



    return(
    <div>

      <div>
        <h1>Creatorverse</h1>
      <Link to="/ ">View Creators</Link> <br></br>
      <Link to="/new"> Add Creator</Link>
      </div>
      
{/* comoponents for each creator */}
      {creators.length === 0 ? (
        <p>No content creators found. Add one!</p>
      ) :(
      <div className="board">
        {creators.map((creator) => (
          <Card key={creator.id} creator={creator} />
        ))}
      </div>
    )}
    </div>
    )
}

export default ShowCreators;





