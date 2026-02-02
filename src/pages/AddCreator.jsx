import { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";


const AddCreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageURL: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      .insert([formData])
      .select();

    if (error) {
      console.error("Error adding creator:", error);
      setErrorMsg(error.message);
      setIsSubmitting(false);
      return;
    }

    console.log("Creator added:", data);
    window.location.href = "/";
  };

  return (
    <div className="form-container">

    

      <h2>Add a New Creator</h2>

      <Link to="/" role="button" className="back-button">
        ← Back
      </Link>

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

        <div className="form-field">
          <label htmlFor="imageURL">Image URL </label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Provide a link to an image of your creator. Be sure to include the http://"
            required
          />
        </div>

        <h3>Social Media Links</h3>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={isSubmitting ? "submitting" : ""}
        >
          {isSubmitting ? "Adding..." : "Add Creator"}
        </button>
      </form>
    </div>
  );
};

export default AddCreator;
