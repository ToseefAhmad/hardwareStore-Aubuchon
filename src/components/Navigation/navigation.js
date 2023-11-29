import { shape, string } from 'prop-types';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useStyle } from '@magento/venia-ui/lib/classify';

import CategoryTree, { CategoryBrands } from '@app/components/CategoryTree';
import LinksList from '@app/components/Footer/linksList';
import { useId } from '@app/hooks/useId';

import NavHeader from './navHeader';
import defaultClasses from './navigation.module.css';
import NavigationRoot from './navigationRoot.js';
import navTransition from './navTransition.css';
import { useNavigation } from './useNavigation';

const Navigation = ({ classes: propsClasses }) => {
    const {
        catalogActions,
        handleBack,
        handleClose,
        isOpen,
        setCategoryId,
        categoryList,
        currentUser,
        isUserSignedIn,
        isUserGettingDetails,
        handleView,
        view
    } = useNavigation();

    const { id } = useId({ prefix: 'navigation' });
    const classes = useStyle(defaultClasses, propsClasses, navTransition);
    const rootClassName = isOpen ? classes.rootOpen : classes.root;
    const isRoot = view === 'ROOT';
    const labels = {
        MENU: 'Departments',
        BRANDS: 'Brands',
        USEFUL: 'Resources',
        ROOT: 'Menu'
    };
    const timeout = 400;

    return (
        <div
            className={rootClassName}
            id="navigation"
            role="dialog"
            aria-modal={true}
            aria-labelledby={id`title`}
        >
            <header className={isRoot ? classes.headerRoot : classes.header}>
                <NavHeader
                    isTopLevel={isRoot}
                    onBack={handleBack}
                    onClose={handleClose}
                    title={
                        categoryList[categoryList.length - 1]?.name ||
                        labels[view] ||
                        ''
                    }
                    labelId={id`title`}
                />
            </header>
            <div className={classes.body}>
                <TransitionGroup>
                    <NavigationRoot
                        handleView={handleView}
                        currentUser={currentUser}
                        isUserSignedIn={isUserSignedIn}
                        isUserGettingDetails={isUserGettingDetails}
                        isRoot={isRoot}
                    />

                    {view === 'MENU' &&
                        categoryList.length &&
                        categoryList.map((category, index) => (
                            <CSSTransition
                                timeout={timeout}
                                classNames="navTransition"
                                key={category.uid}
                            >
                                <CategoryTree
                                    isRootVisible={isRoot}
                                    index={index}
                                    categoryLength={categoryList.length}
                                    categoryId={category.uid}
                                    onNavigate={handleClose}
                                    setCategoryId={setCategoryId}
                                    updateCategories={
                                        catalogActions.updateCategories
                                    }
                                />
                            </CSSTransition>
                        ))}
                    {view === 'BRANDS' && (
                        <CSSTransition
                            timeout={timeout}
                            classNames="navTransition"
                            key={view}
                        >
                            <CategoryBrands
                                categoryId={'MTE1ODE='}
                                isRootVisible={isRoot}
                                onNavigate={handleClose}
                                setCategoryId={setCategoryId}
                            />
                        </CSSTransition>
                    )}
                    {view === 'USEFUL' && (
                        <CSSTransition
                            timeout={timeout}
                            classNames="navTransition"
                            key="useful"
                        >
                            <div>
                                <LinksList
                                    classes={{ root: classes.linksList }}
                                    identifiers={'footer-useful-links'}
                                />
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        </div>
    );
};

Navigation.propTypes = {
    classes: shape({
        body: string,
        close: string,
        header: string,
        headerRoot: string,
        linksList: string,
        open: string,
        root: string,
        rootOpen: string
    })
};

export default Navigation;
