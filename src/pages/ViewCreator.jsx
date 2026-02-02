import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewCreator = () => {
  const params = useParams();
  const id = params.id;

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCreator = async () => {
      setLoading(true);
      setErrorMsg("");

      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        setErrorMsg(error.message);
        setCreator(null);
      } else {
        setCreator(data);
      }

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) return <p>Loading creator...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;
  if (!creator) return <p>Creator not found.</p>;

  console.log("Creator data:", creator);
  console.log("Has youtube?", creator.youtube);
  console.log("Has twitter?", creator.twitter);
  console.log("Has instagram?", creator.instagram);

  return (
    <main className="view-container">
      <Link to="/" role="button" className="back-button">
        ← Back
      </Link>
      <h1>{creator.name}</h1>

      <div className="creator-content">
        {/* LEFT SIDE: Image */}
        <div>
          {creator.imageURL && !imageError ? (
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="creator-detail-img"
              onError={() => setImageError(true)}
            />
          ) : (
            <div>No Image</div>
          )}
        </div>

        {/* RIGHT SIDE: Bio + Social Links */}
        <div className="bio-section">
          <h3>About</h3>
          <p>{creator.description}</p>

          {/* Social Media Links */}
          <h3>Social Media</h3>

          <section className="social">
            {creator.twitter && (
              <div className="social-row">
                <span className="social-icon" aria-hidden="true">
                  🐦
                </span>
                <span className="social-handle">{creator.twitter}</span>
              </div>
            )}

            {creator.instagram && (
              <div className="social-row">
                <span className="social-icon" aria-hidden="true">
                  📸
                </span>
                <span className="social-handle">{creator.instagram}</span>
              </div>
            )}

            {creator.youtube && (
              <div className="social-row">
                <span className="social-icon" aria-hidden="true">
                  📺
                </span>
                <span className="social-handle">{creator.youtube}</span>
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="button-group" style={{ marginTop: "30px" }}>
        <Link to={`/edit/${id}`} role="button">
          Edit
        </Link>
        <button
          role="button"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this creator?")
            ) {
              supabase
                .from("creators")
                .delete()
                .eq("id", id)
                .then(() => {
                  window.location.href = "/";
                });
            }
          }}
        >
          Delete
        </button>
      </div>
    </main>
  );
};

export default ViewCreator;
