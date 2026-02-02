import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageURL: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch the existing creator data when component loads
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
        setLoading(false);
        return;
      }

      // Populate form with existing data
      setFormData({
        name: data.name || "",
        description: data.description || "",
        imageURL: data.imageURL || "",
        youtube: data.youtube || "",
        twitter: data.twitter || "",
        instagram: data.instagram || "",
      });

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("creators")
      .update(formData) // UPDATE
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating creator:", error);
      setErrorMsg(error.message);
      setIsSubmitting(false);
      return;
    }

    console.log("Creator updated:", data);
    window.location.href = `/view/${id}`;
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this creator?`,
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      alert(`Error deleting creator: ${error.message}`);
    } else {
      window.location.href = "/";
    }
  };

  if (loading) return <p>Loading creator...</p>;
  if (errorMsg && !formData.name) return <p>Error: {errorMsg}</p>;

  return (
    <div className="form-container">
      <Link to="/" role="button" className="back-button">
        ← Back
      </Link>

      <h2>Edit Creator</h2>

      {errorMsg && <p className="error-message">Error: {errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter creator's name"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Provide a link to an image of your creator. Be sure to include the http://"
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a description of the creator. Who are they? What makes them interesting?"
            rows="4"
            required
          />
        </div>

        <h3>Social Media Links</h3>
        <h5>Provide at least one of the creator's social media links.</h5>
        <p className="social-subtitle">
          Provide at least one of the creator's social media links.
        </p>

        <div className="form-field">
          <label htmlFor="youtube">📺 YouTube</label>
          <input
            type="text"
            id="youtube"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            placeholder="The creator's YouTube handle (without the @)"
          />
        </div>

        <div className="form-field">
          <label htmlFor="twitter">🐦 Twitter</label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="The creator's Twitter handle (without the @)"
          />
        </div>

        <div className="form-field">
          <label htmlFor="instagram">📷 Instagram</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="The creator's Instagram handle (without the @)"
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? "Updating..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
