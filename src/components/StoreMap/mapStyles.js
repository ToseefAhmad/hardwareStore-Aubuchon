export default [
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'transit',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    }
];
