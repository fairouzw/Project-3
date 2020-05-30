import React, { useState } from "react";
import "./BoxesSlides.css";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: require("./images/flowers-box.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box2.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box3.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box18.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box4.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box5.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box6.png"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box7.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box8.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box9.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box10.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box11.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box12.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box13.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box13.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box14.jpeg"),
    altText: "",
    caption: "",
  },

  {
    src: require("./images/Box15.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box16.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box17.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box19.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box20.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box21.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box22.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box23.jpeg"),
    altText: "",
    caption: "",
  },
  {
    src: require("./images/Box24.jpeg"),
    altText: "",
    caption: "",
  },
];

const BoxesSlides = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default BoxesSlides;
