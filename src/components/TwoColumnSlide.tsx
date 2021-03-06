import * as React from 'react';
import { SlideProps } from '../Props';
import '../stylesheets/Slides.scss';
import TwoColumnContent from './TwoColumnContent';

const TwoColumnSlide = (props: SlideProps) => {
    return (
        <div className="two-column-slide">
            <div className="row">
                <h3>{props.slide.title}</h3>
            </div>
            <div className="row">
                {props.slide.content.map((content, index) =>
                    <TwoColumnContent key={index} content={content} />)
                }
            </div>
        </div>
    );
};

export default TwoColumnSlide;