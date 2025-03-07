/**
 * HomepageUpdate.jsx
 * Created by Brian Petway 08/22/22
 */

import React from "react";
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import AgencyProfileV2 from "../agency/AgencyPage";

const HomepageUpdate = () => {
    // Directly render the AgencyProfile component with the DOD slug
    return (
        <PageWrapper
            pageName="agency-v2"
            classNames="usa-da-agency-page-v2"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}
        >
            <main id="main-content" className="main-content homepage-update-content">
                <AgencyProfileV2 
                    agencySlug="department-of-defense" 
                    selectedFy="2025"
                    match={{ params: { agencySlug: "department-of-defense" } }}
                />
            </main>
        </PageWrapper>
    );
};

export default HomepageUpdate;
