import '../styles/testimonial-box.scss';
import RevealUpAnimationSequential from 'components/RevealUpAnimationSequential';

const TestimonialBox = ({ logo, title, description, people }) => {
  return (
    <div className="TestimonialBox revealUpSequential">
      <RevealUpAnimationSequential />
      <div className="testimonial-contain">
        <img src={logo} alt="Logo" />
        <h2>{title}</h2>
        <p>{description}</p>
        <h4>{people}</h4>
      </div>
    </div>
  );
};

export default TestimonialBox;
