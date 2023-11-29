import { shape } from 'prop-types';
import React from 'react';

import { useUserContext } from '@app/context/user';
import Row from '@app/pageBuilder/ContentTypes/Row';
import ContentTypeFactory from '@app/pageBuilder/factory';

const CreateAccountBlockContainer = restProps => {
    const [{ isSignedIn }] = useUserContext();

    return (
        !isSignedIn && (
            <Row {...restProps}>
                {restProps.childItems.map((childTreeItem, i) => (
                    <ContentTypeFactory key={i} data={childTreeItem} />
                ))}
            </Row>
        )
    );
};

CreateAccountBlockContainer.propTypes = {
    restProps: shape({})
};

export default CreateAccountBlockContainer;
