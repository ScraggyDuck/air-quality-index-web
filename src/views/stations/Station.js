import React, { useEffect, useState } from "react";
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
import { StationService } from "src/services";

const getBadge = (status) => {
  switch (status) {
    case true:
      return "success";
    case false:
      return "secondary";
  }
};

const Station = ({ match }) => {
  const [station, setStation] = useState({});

  const fetchStationById = async () => {
    try {
      const data = await StationService.getStationById(match.params.id);
      if (data) {
        setStation(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStationById();
  }, []);

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <b>Station id:</b> {match.params.id} <br /> <b>Station name:</b>
            {station?.NameDevice}
            <br /> <b>Area:</b>
            {station?.area}
          </CCardHeader>

          <CCardBody>
            {!station ? (
              <span>
                <CIcon className="text-muted" name="cui-icon-ban" /> Not found
              </span>
            ) : (
              <table bordered className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <th>O2 (ppm)</th>
                    <th>PRES (pa)</th>
                    <th>TEM (%)</th>
                    <th>HUM (%)</th>
                    <th>PM2.5</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>

                  {station &&
                    station.data &&
                    station.data.map((item) => (
                      <tr>
                        <td>{item?.O2}</td>
                        <td>{item?.Pre}</td>
                        <td>{item?.Tem}</td>
                        <td>{item?.Hum}</td>
                        <td>{item?.PM25}</td>
                        <td>
                          <CBadge color={getBadge(station.status)}>
                            {station.status ? "Active" : "Inactive"}
                          </CBadge>
                        </td>
                        <td> {new Date(item?.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
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
