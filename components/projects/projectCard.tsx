import React, { useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import { CardListItem } from "./cardsList";
import { fireEvent } from "../../lib/ga";

const ProjectCard: React.FC<CardListItem> = ({ imageUrl, gotoUrl, altText, title, logos }) => {
  const trackClick = useCallback(() => {
    fireEvent({ action: 'project-click', params: { project: title, url: gotoUrl }});
  }, [gotoUrl, title])

  return (
    <Container className="project-card" href={gotoUrl} onClickCapture={trackClick}>
      <Image 
        width="200px" 
        height="200px" 
        src={`/images/projects/${imageUrl}`} 
        alt={altText} 
        placeholder="blur" 
        blurDataURL="/images/projects/blurred_shapes.png" />
      <Title>{title}</Title>
      <Sub>
        {logos.map((logo, index) => (
          <Image 
            key={index} 
            width="32px" 
            height="32px"
            src={`/images/projects/logos/${logo}`} 
            alt={`${logo} image`}
            />
        ))}
      </Sub>
    </Container>
  );
};

const Container = styled.a`
  position: relative;
  width: 200px;
  height: 270px;
  display: grid;
  grid-template-rows: 200px 0.8rem auto;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
  color: #171515;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    transform: translateY(6px);
    transition: transform 200ms ease-in-out;
  }

  img {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const Title = styled.p`
  font-size: 0.8rem;
  line-height: 0.8rem;
  margin: 0.2rem 0;
  text-align:  center;
`

const Sub = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 32px);
  grid-auto-rows: 32px;
  grid-gap: 0.2rem;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
`

export { ProjectCard };
