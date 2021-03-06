import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";
import { StationService } from "src/services";

const getBadge = (status) => {
  if (status) {
    return "success";
  }
  return "secondary";
};

// const getAQIBadge = (aqi) => {
//   if (aqi >= 0 && aqi < 100) {
//     return "success";
//   } else if (aqi >= 100 && aqi < 150) {
//     return "warning";
//   }
//   if (aqi >= 150) {
//     return "danger";
//   }
// };

const Stations = () => {
  const [stationsData, setStationsData] = useState([]);
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/stations?page=${newPage}`);
  };

  const fetchStationsData = async () => {
    try {
      const data = await StationService.getAllStations();
      if (data) {
        setStationsData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    fetchStationsData();
  }, []);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader className="font-weight-bold">
            Monitoring Stations
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={stationsData}
              fields={[
                {
                  key: "NameDevice",
                  label: "Station Name",
                  _classes: "font-weight-bold",
                },
                "area",
                "status",
              ]}
              hover
              striped
              itemsPerPage={6}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/stations/${item._id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status ? "Active" : "Inactive"}
                    </CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(stationsData.length / 6)}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Stations;
