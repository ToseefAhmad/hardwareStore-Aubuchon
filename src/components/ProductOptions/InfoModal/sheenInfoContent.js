import { shape, string } from 'prop-types';
import React from 'react';

const SheenInfoContent = ({ classes }) => {
    return (
        <>
            <div className={classes.block}>
                <p className={classes.title}>Flat</p>
                <p>
                    Flat does not reflect light, resulting in no sheen at all.
                    This lack of reflection allows more paint pigment to come
                    through, is more forgiving of flaws and allows for excellent
                    hide, creating a uniform surface. Recommended for ceilings
                    and siding.
                </p>
            </div>
            <div className={classes.block}>
                <p className={classes.title}>Matte</p>
                <p>
                    Matte finish is nearly as shine-free as flat, again
                    providing excellent hide and depth of color, with slightly
                    more durability. Best used in low-traffic areas like master
                    bedrooms, closets, or formal dining rooms.
                </p>
            </div>
            <div className={classes.block}>
                <p className={classes.title}>Eggshell</p>
                <p>
                    Eggshell is the perfect middle ground between a matte look
                    and higher gloss durability, making it a go-to, all-purpose
                    finish for high-traffic areas. Recommended for use in
                    moderately used areas like guest bedrooms or windows.
                </p>
            </div>

            <div className={classes.block}>
                <p className={classes.title}>Pearl</p>
                <p>
                    A pearl finish is a medium gloss that maintains high
                    durability. Both beautiful and easy to clean, a pearl finish
                    lends dimension to trim while being optimal for walls in
                    high-traffic areas like hallways or kitchens.
                </p>
            </div>
            <div className={classes.block}>
                <p className={classes.title}>Satin</p>
                <p>
                    Often confused with other finishes, the difference between
                    eggshell and satin paint is that satin delivers a higher
                    gloss, while offering better stain resistance and durability
                    than lower sheens, including eggshell. Recommended for use
                    in high-traffic areas like kid bedrooms, entryways or
                    kitchens as well as cabinets and shutters.
                </p>
            </div>
            <div className={classes.block}>
                <p className={classes.title}>Semi-Gloss</p>
                <p>
                    The luminous look of a semi-gloss paint is perfectly suited
                    to highlight the architectural details of your home and
                    create dimension on millwork, trim, and doors. Best used in
                    high-traffic or high-moisture areas like bathrooms and
                    kitchens.
                </p>
            </div>
            <div className={classes.block}>
                <p className={classes.title}>High Gloss</p>
                <p>
                    Higher gloss adds dimension and levity to any room. Offering
                    a mirror-like finish, high gloss sits on top of the sheen
                    chart. Recommended for architectural details and furniture.
                </p>
            </div>
        </>
    );
};

SheenInfoContent.propTypes = {
    classes: shape({
        block: string,
        title: string
    })
};

export default SheenInfoContent;
