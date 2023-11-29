import { func, string } from 'prop-types';
import React from 'react';

import Field from '@app/components/Field';
import { Search as SearchIcon } from '@app/components/Icons';
import Input from '@app/components/TextInput/textInput';

import { useQuestionField } from './useQuestionField';

const QuestionField = ({ handleInputChange, searchQuery }) => {
    useQuestionField({ searchQuery });

    return (
        <Field label="Have a question? Ask owners.">
            <Input
                field="question"
                placeholder="Enter the question"
                icon={<SearchIcon />}
                onChange={handleInputChange}
                onKeyPress={e => {
                    e.key === 'Enter' && e.preventDefault();
                }}
            />
        </Field>
    );
};

QuestionField.propTypes = {
    handleInputChange: func.isRequired,
    searchQuery: string
};

QuestionField.defaultProps = {
    searchQuery: ''
};

export default QuestionField;
