import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import ServiceEdit from './ServiceEdit';
import ServiceList from './ServiceList';

function Services() {

    return (
        <Router>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css" />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <Routes>
                            <Route path="/" element={<Navigate to="/services/" />} />
                            <Route path="/services/" element={<ServiceList />} />
                            <Route path="/services/:id" element={<ServiceEdit />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default Services;