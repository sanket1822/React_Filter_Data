import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ListingData from "../Data/data.json"
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
} from "reactstrap";
import _ from 'lodash'; 

function DataTable() {


    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({
        lastName: '',
        updated: '',
        types: '',
      });

    const columns = [
        {
            dataField: 'firstName',
            text: 'First Name',
            sort: true
        },
        {
            dataField: 'lastName',
            text: 'Last Name',
        },
        {
            dataField: 'townCity',
            text: 'Town City',
        },
        {
            dataField: 'postcode',
            text: 'Post Code'
        },
        {
            dataField: 'leadType',
            text: 'Lead'
        },
        {
            dataField: 'lastUpdatedDate',
            text: 'Updated' 
        },
        {
            dataField: 'createdDate',
            text: 'Created' 
        }
    ];

    useEffect(() => {
        // Simulating the data fetching process with a timeout
        setTimeout(() => {
            setListings(ListingData);
        }, 1000);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      };
    
    const filteredProducts = listings.filter((listing) => {
        return (
          (!filters.lastName ||  _.includes(listing.lastName.toLowerCase(), filters.lastName.toLowerCase())) &&
          (!filters.updated || listing.lastUpdatedDate.includes(filters.updated)) &&
          (!filters.types ||  _.includes(listing.leadType.toLowerCase(), filters.types.toLowerCase()))
        );
    });
   
   
    const pageOptions = {
        sizePerPage: 10,
        totalSize: filteredProducts? filteredProducts.length : listings.length,
        custom: true,
    };

    const defaultSorted = [
        {
          dataField: "firstName",
          order: "asc",
        },
      ];


    return (
        <div className="container my-5">
            <Card>
                <CardHeader>
                    <Row>
                        <Col>
                            <h2 className="text-center mb-4"> All Listings</h2>
                        </Col>
                    </Row>
                    <div className="row mb-3">
                        <div className="col">
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Filter by Last Name"
                            value={filters.lastName}
                            onChange={handleFilterChange}
                        />
                        </div>
                        <div className="col">
                        <input
                            type="text"
                            name="updated"
                            className="form-control"
                            placeholder="Filter by Updated"
                            value={filters.updated}
                            onChange={handleFilterChange}
                        />
                        </div>
                        <div className="col">
                        <input
                            type="text"
                            name="types"
                            className="form-control"
                            placeholder="Filter by Types"
                            value={filters.types}
                            onChange={handleFilterChange}
                        />
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <PaginationProvider pagination={paginationFactory(pageOptions)}>
                        {({ paginationProps, paginationTableProps }) => (
                            <>
                                <Row>
                                    <Col>
                                        <BootstrapTable
                                            keyField='postcode'
                                            data={filteredProducts}
                                            columns={columns}
                                            defaultSorted={defaultSorted}
                                            {...paginationTableProps}
                                           // classes="custom-table" 
                                            wrapperClasses="table-responsive" // Add a wrapper class for responsive table
                                            classes="table table-bordered table-striped table-hover" // Bootstrap table classes
                                        />
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-end mt-4">
                                    <PaginationListStandalone {...paginationProps} />
                                    <SizePerPageDropdownStandalone {...paginationProps} />
                                </div>
                            </>
                        )}
                    </PaginationProvider>
                </CardBody>
            </Card>


        </div>
    )
}

export default DataTable