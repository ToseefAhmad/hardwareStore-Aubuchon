export default node => {
    return {
        productCarouselType: node.getAttribute('data-type'),
        productCarouselTitle: node.getAttribute('data-title')
    };
};
