import { SlideshowModel } from '../Models'
import { History } from 'history';
import * as fetch from 'isomorphic-fetch'

const BASE_URL: string = 'http://localhost:3000/api/v1';

export const nextSlide = (id: string, index: string, totalLength: number, history: History) => {
    const currentIndex = parseInt(index);
    const nextIndex: number = currentIndex < totalLength - 1 ? currentIndex + 1 : currentIndex;
    return handleSlide(id, nextIndex, history);
}

export const previousSlide = (id: string, index: string, totalLength: number, history: History) => {
    const currentIndex = parseInt(index);
    const previousIndex: number = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    return handleSlide(id, previousIndex, history);
}

const handleSlide = (id: string, index: number, history: History) => {
    history.push(`/slideshows/${id}/slides/${index}`);
    return viewSlide(index);
}

export const viewSlide = (index: number) => {
    return {
        type: 'VIEW_SLIDE',
        index
    };
}

export const clearViewedIndices = () => {
    return {
        type: 'CLEAR_VIEWED_INDICES',
        viewedIndices: Array<string>()
    }
}

export const clearError = () => {
    return {
        type: 'CLEAR_ERROR'
    }
};

export const loadSlideshow = (slideshow: SlideshowModel, currentIndex: number) => {
    return {
        type: 'LOAD_SLIDESHOW',
        slideshow,
        currentIndex
    }
};

export const loadSlideshowError = (error: any) => {
    return {
        type: 'LOAD_SLIDESHOW_ERROR',
        error
    }
}

export const fetchSlideshow = (id: number, index: number = 0) => (dispatch: any, getState: any) => {
    fetch(`${BASE_URL}/slideshows/${id}`)
        .then((response: any) => {
            if (response.status === 404) {
                return Promise.reject("No Slideshow Found");
            } else {
                return Promise.resolve(response.json());
            }
        })
        .then(json => dispatch(loadSlideshow(json, index)))
        .catch(error => dispatch(loadSlideshowError((error))));

    dispatch(
        {
            type: 'FETCH_SLIDESHOW',
            loading: true,
            viewedIndices: Array<string>()
        });
};