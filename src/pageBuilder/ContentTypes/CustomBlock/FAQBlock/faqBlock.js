import parse from 'html-react-parser';
import { string } from 'prop-types';
import React, { useMemo } from 'react';

import { Accordion, Section } from '@magento/venia-ui/lib/components/Accordion';

import { RichSnippet } from '@app/components/Head';

import classes from './faqBlock.module.css';

const FAQBlock = ({ richContent }) => {
    // Elements which come from CMS page or block content.
    const listOfQA = useMemo(() => {
        let resultStrOfQuestions = '';
        let resultStrOfAnswers = '';

        const questionsContainer = document.createElement('div');
        const answersContainer = document.createElement('div');

        questionsContainer.innerHTML = richContent;
        answersContainer.innerHTML = richContent;

        const paragraphArray = questionsContainer.querySelectorAll('p');
        const unorderedListArray = answersContainer.querySelectorAll('ul');

        paragraphArray.length &&
            Array.from(paragraphArray).forEach(({ outerHTML }) => {
                resultStrOfQuestions += outerHTML;
            });
        unorderedListArray.length &&
            Array.from(unorderedListArray).forEach(({ outerHTML }) => {
                resultStrOfAnswers += outerHTML;
            });

        const questionsText = [];
        paragraphArray.forEach(item => {
            questionsText.push(item.innerText.trim());
        });

        const answersHtml = [];
        unorderedListArray.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.append(item);
            answersHtml.push(wrapper.innerHTML);
        });

        return {
            answers: resultStrOfAnswers.length
                ? parse(resultStrOfAnswers)
                : null,
            questions: resultStrOfQuestions.length
                ? parse(resultStrOfQuestions)
                : null,
            questionsText,
            answersHtml
        };
    }, [richContent]);

    const { questions, answers, questionsText, answersHtml } = listOfQA;

    const faqStructuredData = useMemo(() => {
        const faqList = questionsText.map((question, index) => {
            return {
                '@type': 'Question',
                name: question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: answersHtml[index]
                }
            };
        });

        return {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqList
        };
    }, [answersHtml, questionsText]);

    return (
        <>
            <RichSnippet data={faqStructuredData} />
            <div className={classes.root}>
                <Accordion canOpenMultiple={true}>
                    {answers?.length && (
                        <>
                            {questions.map(item => (
                                <div
                                    className={classes.sectionContainer}
                                    key={item.key}
                                >
                                    <Section id={item.key} title={item}>
                                        {answers[item.key]}
                                    </Section>
                                </div>
                            ))}
                        </>
                    )}
                </Accordion>
            </div>
        </>
    );
};

FAQBlock.propTypes = {
    richContent: string.isRequired
};

export default FAQBlock;
