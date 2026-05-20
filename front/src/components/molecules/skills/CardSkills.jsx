import "./Skills.css";
import { cardsData } from "../../../data/skillsMastered";

const CardSkill = () => {
  return (
    <>
    <div class="skills__cajas" >

      {
      [...cardsData, ...cardsData].map((cardData) => {
        return (
          <div className="skills__caja caja__dark brutalist-button openai">
            <div className="openai-logo">
              <img
                className={`skills__icono skills__icono__dark openai-icon ${cardData.clas}`}
                src={cardData.imgSrc}
                alt={cardData.imgAlt}
              />
            </div>
            <div className="button-text">
              <span>Skill</span>
              <span>{cardData.title}</span>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default CardSkill;
