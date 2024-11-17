import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // State for each dropdown visibility
  const [isParagraphVisible1, setIsParagraphVisible1] = useState(false);
  const [isParagraphVisible2, setIsParagraphVisible2] = useState(false);
  const [isParagraphVisible3, setIsParagraphVisible3] = useState(false);
  const [isParagraphVisible4, setIsParagraphVisible4] = useState(false);

  const handleCreateAccountClick = () => {
    navigate("/login");
  };

  const toggleParagraphVisibility = (index: number) => {
    switch (index) {
      case 1:
        setIsParagraphVisible1((prevState) => !prevState);
        break;
      case 2:
        setIsParagraphVisible2((prevState) => !prevState);
        break;
      case 3:
        setIsParagraphVisible3((prevState) => !prevState);
        break;
      case 4:
        setIsParagraphVisible4((prevState) => !prevState);
        break;
      default:
        break;
    }
  };

  return (
    <div className="LandingPage">
      <header className="header">
        <div className="logo">NoteVis</div>
        <nav className="nav">
          <a
            href="#signin"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default link behavior
              navigate("/login"); // Navigate to the login page
            }}
          >
            Sign in
          </a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>A New Way to Understand Data</h1>
          <p>
            As it is today, data is everywhere. We enter our data into
            everything—from job applications, to social media, and so much more.
            With so much of our data floating around everywhere, it's only
            natural for one to wonder just exactly where their data goes to and
            how it's used—and that's why we created NoteVis, to allow users to
            see just exactly what happens to their data when they enter it
            somewhere.
          </p>
          <button className="cta-button" onClick={handleCreateAccountClick}>
            Get Started!
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://cdn.discordapp.com/attachments/1307481379575173243/1307693725304229960/AI2-Photoroom.png?ex=673b3c2f&is=6739eaaf&hm=bacabb38c6780a8138773715e42bda524cfb1a387acbd8ebe5acb4d30ef02713&"
            alt="Dashboard preview"
          />
        </div>
      </section>
      <section className="explore">
        <div
          className="question-bar"
          onClick={() => toggleParagraphVisibility(1)}
        >
          <span className="question-text">What is NoteVis?</span>
          <span className={`arrow ${isParagraphVisible1 ? "rotate" : ""}`}>
            ▼
          </span>
        </div>

        <p
          className={`dropdown-paragraph ${isParagraphVisible1 ? "show" : ""}`}
        >
          NoteVis is a tool aimed to assist data scientists in their work.
          NoteVis uses memoization to show the user a plethora of visualizations
          that will help them with whatever work they may need. NoteVis provides
          a working tree, data visualizations, as well as an AI assistant to
          summarize what each segment of code is about.
        </p>

        <div
          className="question-bar"
          onClick={() => toggleParagraphVisibility(2)}
        >
          <span className="question-text">Accomplishments We are Proud of</span>
          <span className={`arrow ${isParagraphVisible2 ? "rotate" : ""}`}>
            ▼
          </span>
        </div>

        <p
          className={`dropdown-paragraph ${isParagraphVisible2 ? "show" : ""}`}
        >
          We're proud that we were able to utilize so many new technologies to
          such an efficacy. We never imagined to be able to use tools like Samba
          Nova's Cloud API and Supabase really well on our first try but they
          were really fun to work with and learn about.
        </p>

        <div
          className="question-bar"
          onClick={() => toggleParagraphVisibility(3)}
        >
          <span className="question-text">Who can use NoteVis?</span>
          <span className={`arrow ${isParagraphVisible3 ? "rotate" : ""}`}>
            ▼
          </span>
        </div>

        <p
          className={`dropdown-paragraph ${isParagraphVisible3 ? "show" : ""}`}
        >
          NoteVis is designed for data scientists, analysts, and anyone working
          with large datasets who needs a more intuitive way to explore data
          visualizations and optimize workflows.
        </p>

        <div
          className="question-bar"
          onClick={() => toggleParagraphVisibility(4)}
        >
          <span className="question-text">What we Learned</span>
          <span className={`arrow ${isParagraphVisible4 ? "rotate" : ""}`}>
            ▼
          </span>
        </div>

        <p
          className={`dropdown-paragraph ${isParagraphVisible4 ? "show" : ""}`}
        >
          There were a plethora of things that we had learned over the course of
          this hackathon. For starters, we learned how to utilize Supabase to
          provide authentication for user input and profiles. On top of that, we
          learned how to utilize Samba Nova's cloud API, which gave us access to
          AI models and made it significantly easier to improve the efficiency
          of our program and analyze data.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
