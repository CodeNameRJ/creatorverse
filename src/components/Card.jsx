import { Link } from "react-router-dom";
import { PencilIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const Card = ({ creator }) => {


  return (
    <div className="creator-card">
      <h2 className="creator-name">{creator.name}</h2>

      {creator.imageURL ? (
        <img src={creator.imageURL} alt={creator.name} className="creator-img" />
      ) : null}


      {creator.url && (
        <p>
          <a className="creator-link" href={creator.url} target="_blank" rel="noreferrer">
            {/* {creator.url} */}
          </a>
        </p>
      )}

      {creator.description && <p className="creator-des">{creator.description}</p>}

      <article className="creator-actions">
        <Link to={`/view/${creator.id}`} aria-label="View Creator">
          <InformationCircleIcon className="icon" />
        </Link>
        <Link to={`/edit/${creator.id}`} aria-label="Edit Creator">
          <PencilIcon className="icon" />
        </Link>
      </article>
      

    </div>
  );
}


export default Card