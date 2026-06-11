import React from 'react';
import SEO from '../components/SEO';
import './About.css';

const team = [
  { name: 'Marco Rossi', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300', desc: 'Michelin-starred chef with 20 years of culinary excellence' },
  { name: 'Sophie Laurent', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300', desc: 'Award-winning pastry artist from Paris' },
  { name: 'James Wilson', role: 'Restaurant Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', desc: 'Ensuring every guest experience is perfect' },
  { name: 'Anna Kim', role: 'Sommelier', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300', desc: 'Curating the finest wine selections from around the world' },
];

const About = () => {
  return (
    <>
      <SEO title="About Us" description="Learn about DineFlow's story, mission, and our passionate team of culinary experts." />

      <section className="page-hero">
        <h1>About DineFlow</h1>
        <p>Our passion for exceptional dining</p>
      </section>

      <section className="about-story section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600" alt="DineFlow Restaurant" loading="lazy" />
            </div>
            <div className="about-content">
              <span className="story-badge">Our Story</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                A Legacy of <span className="text-highlight">Culinary Excellence</span>
              </h2>
              <p>
                Founded in 2010, DineFlow began with a simple vision: to create a dining experience
                that transcends the ordinary. What started as a small bistro has grown into one of
                the city's most celebrated restaurants.
              </p>
              <p>
                Our journey has been defined by a relentless pursuit of perfection. From sourcing
                the finest ingredients to training world-class chefs, every aspect of DineFlow
                reflects our commitment to excellence.
              </p>
              <p>
                Today, we continue to innovate while honoring the traditions that made us great.
                Every dish tells a story, every meal is a memory, and every guest is family.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <span className="mission-icon">🎯</span>
              <h3>Our Mission</h3>
              <p>To provide exceptional dining experiences that delight the senses and create lasting memories through innovative cuisine and impeccable service.</p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">👁️</span>
              <h3>Our Vision</h3>
              <p>To be recognized as the premier dining destination, setting the standard for culinary excellence, hospitality, and innovation in the restaurant industry.</p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">💎</span>
              <h3>Our Values</h3>
              <p>Quality, integrity, creativity, and sustainability guide everything we do, from ingredient sourcing to guest service and community engagement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-history section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2010</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>DineFlow opened its doors as a small 40-seat bistro with a dream to revolutionize fine dining.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2013</div>
              <div className="timeline-content">
                <h3>First Expansion</h3>
                <p>After receiving critical acclaim, we expanded to accommodate 120 guests and launched our private dining room.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2017</div>
              <div className="timeline-content">
                <h3>Michelin Recognition</h3>
                <p>Awarded our first Michelin star, cementing our place among the world's finest restaurants.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>Digital Innovation</h3>
                <p>Launched our smart reservation platform, making fine dining more accessible than ever.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">The passionate people behind every great meal</p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="team-body">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
