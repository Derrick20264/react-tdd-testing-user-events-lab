import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: {
      tech: false,
      design: false,
      writing: false,
    },
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: {
          ...prev.interests,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>Lorem ipsum dolor sit amet...</p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <fieldset>
          <legend>Select your interests:</legend>
          <label>
            <input
              type="checkbox"
              name="tech"
              checked={formData.interests.tech}
              onChange={handleChange}
            />
            Tech
          </label>
          <label>
            <input
              type="checkbox"
              name="design"
              checked={formData.interests.design}
              onChange={handleChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              name="writing"
              checked={formData.interests.writing}
              onChange={handleChange}
            />
            Writing
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>
          Thanks for signing up, {formData.name}! We'll reach out to you at{" "}
          {formData.email}. You selected:{" "}
          {Object.entries(formData.interests)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(", ")}
        </p>
      )}
    </main>
  );
}

export default App;
