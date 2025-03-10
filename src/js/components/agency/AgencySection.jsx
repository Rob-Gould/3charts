import React from "react";
import PropTypes from "prop-types";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingMessage, SectionWrapper } from "data-transparency-ui";

const dayjs = require("dayjs");

const propTypes = {
  section: PropTypes.shape({
    section: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  icon: PropTypes.string,
  children: PropTypes.element,
  isLoading: PropTypes.bool,
  dataThroughDate: PropTypes.string,
};

const AgencySection = ({
  section,
  icon = "chart-area",
  children,
  isLoading,
  dataThroughDate,
}) => {
  let dataThroughNote;
  if (dataThroughDate) {
    if (dataThroughDate === "no data") {
      dataThroughNote = "No data available for the selected fiscal year";
    } else {
      dataThroughNote = `Data through ${dayjs(dataThroughDate).format(
        "M/D/YYYY"
      )}`;
    }
  }

  return (
    <SectionWrapper id={`agency-v2-${section.section}`} title={section.label}>
      {dataThroughNote ? (
        <div className="section__date-note">{dataThroughNote}</div>
      ) : null}
      {isLoading ? <LoadingMessage /> : children}
    </SectionWrapper>
  );
};

AgencySection.propTypes = propTypes;
export default AgencySection;
