/**
 * AgencyOverview.jsx
 * Created by Lizzie Salita 3/16/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import FySummary from './FySummary';

const propTypes = {
    fy: PropTypes.string,
    dataThroughDate: PropTypes.string
};

const AgencyOverview = ({ fy, dataThroughDate }) => {
    const {
        showAboutData
    } = useSelector((state) => state.agency.overview);

    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="body__content agency-overview">
            <FySummary fy={fy} dataThroughDate={dataThroughDate} windowWidth={windowWidth} isMobile={isMobile} />
        </div>
    );
};

AgencyOverview.propTypes = propTypes;
export default AgencyOverview;
