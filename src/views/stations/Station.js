import React from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import stationsData from "./StationsData";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
  }
};

const Station = ({ match }) => {
  const station = stationsData.find(
    (station) => station.id.toString() === match.params.id
  );

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Station id: {match.params.id}</CCardHeader>
          <CCardBody>
            {!station ? (
              <span>
                <CIcon className="text-muted" name="cui-icon-ban" /> Not found
              </span>
            ) : (
              <table bordered className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{station.name}</td>
                  </tr>
                  <tr>
                    <th>CO (ppm)</th>
                    <td>{station.co}</td>
                  </tr>
                  <tr>
                    <th>BAT (%)</th>
                    <td>{station.bat}</td>
                  </tr>
                  <tr>
                    <th>HUM (%)</th>
                    <td>{station.hum}</td>
                  </tr>
                  <tr>
                    <th>TC (Pa)</th>
                    <td>{station.tc}</td>
                  </tr>
                  <tr>
                    <th>NO2 (ppm)</th>
                    <td>{station.no2}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <CBadge color={getBadge(station.status)}>
                        {station.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Station;
