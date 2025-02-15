import PropTypes from 'prop-types';

/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { IntlProvider } from 'react-intl';

class Localized extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        messages: PropTypes.object,
        loadingError: PropTypes.string,
        localeKey: PropTypes.bool
    };

    static childContextTypes = {
        locale: PropTypes.string,
        messages: PropTypes.object,
        localeKey: PropTypes.bool
    };
    static defaultProps = {
        localeKey: true
    };
    getChildContext() {
        return {
            locale: this.props.locale,
            messages: this.props.messages
        };
    }

    componentDidMount() {
        this.updateDocumentLangAttribute();
    }

    componentDidUpdate(prevProps) {
        if (this.props.locale !== prevProps.locale) {
            this.updateDocumentLangAttribute();
        }
    }

    render() {
        let { children } = this.props;

        if (this.props.messages && this.props.locale) {
            if (typeof children === 'function') {
                children = children();
            }

            return (<IntlProvider {...this.props.localeKey && { key: this.props.locale }} locale={this.props.locale}
                messages={this.flattenMessages(this.props.messages)}
            >
                {children}
            </IntlProvider>);
            // return React.Children.only(children);
        } else if (this.props.loadingError) {
            return <div className="loading-locale-error">{this.props.loadingError}</div>;
        }
        return null;
    }

    flattenMessages = (messages, prefix = '') => {
        return Object.keys(messages).reduce((previous, current) => {
            return typeof messages[current] === 'string' ? {
                [prefix + current]: messages[current],
                ...previous
            } : {
                ...this.flattenMessages(messages[current], prefix + current + '.'),
                ...previous
            };
        }, {});
    };

    updateDocumentLangAttribute() {
        if (document?.documentElement) {
            document.documentElement.setAttribute("lang", this.props.locale);
        }
    }
}

export default Localized;
