/**
 * HomeAgencyContainer.jsx
 * Modified version of AgencyContainer for the homepage
 */

import React, { useState, useEffect, useRef } from "react";
import { isCancel } from "axios";
import { useDispatch } from "react-redux";

import { fetchAgencyOverview } from "apis/agency";
import BaseAgencyOverview from "models/v2/agency/BaseAgencyOverview";
import { setAgencyOverview, resetAgency } from "redux/actions/agency/agencyActions";

import { useLatestAccountData } from "containers/account/WithLatestFy";
import AgencyPage from "components/agency/AgencyPage";
import { useAgencySlugs } from "containers/agency/WithAgencySlugs";

// This is a specialized version of AgencyContainer that doesn't depend on router params
const HomeAgencyContainer = () => {
    // Hardcoded for homepage
    const agencySlug = "department-of-defense";
    const [, , { year: latestFy }] = useLatestAccountData();
    const [selectedFy, setSelectedFy] = useState(latestFy?.toString() || "2025");

    // Use a custom hook to get the { agency slug: toptier code } mapping
    const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const request = useRef(null);
    const dispatch = useDispatch();
    const [toptierCode, setToptierCode] = useState(null);

    // When slugs are loaded, get the toptier code
    useEffect(() => {
        if (!slugsLoading && !slugsError && agencySlugs) {
            const code = agencySlugs[agencySlug];
            if (code) {
                setToptierCode(code);
            } else {
                setError(true);
                setErrorMessage("Agency not found");
            }
        } else if (slugsError) {
            setError(true);
            setErrorMessage("Failed to load agency data");
        }
    }, [agencySlugs, slugsLoading, slugsError, agencySlug]);

    // Fetch agency data when we have the toptier code and selectedFy
    useEffect(() => {
        if (selectedFy && toptierCode) {
            if (request.current) {
                request.current.cancel();
            }
            setLoading(true);
            setError(false);
            setErrorMessage("");
            
            // Request overview data for this agency
            request.current = fetchAgencyOverview(toptierCode, selectedFy);
            request.current.promise
                .then((res) => {
                    setLoading(false);
                    const agencyOverview = Object.create(BaseAgencyOverview);
                    agencyOverview.populate(res.data);
                    dispatch(setAgencyOverview(agencyOverview));
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        setError(true);
                        setErrorMessage(err.message);
                        setLoading(false);
                        request.current = null;
                        console.error(err);
                    }
                });
        }
    }, [toptierCode, selectedFy, dispatch]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            dispatch(resetAgency());
            if (request.current) {
                request.current.cancel();
            }
        };
    }, [dispatch]);

    return (
        <AgencyPage
            setSelectedFy={setSelectedFy}
            latestFy={latestFy}
            selectedFy={selectedFy}
            agencySlug={agencySlug}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage} 
        />
    );
};

export default HomeAgencyContainer;