// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div className="bg-dark text-white vh-100 d-flex flex-column p-3">
//       <h4 className="text-center mb-4">Menu</h4>
//       <ul className="nav flex-column">
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/"
//             className="nav-link text-white"
//             activeClassName="fw-bold text-primary"
//           >
//             Model Master
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/defect-master/view"
//             className="nav-link text-white"
//             activeClassName="fw-bold text-primary"
//           >
//             Defect Master
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/defect-data-entry/view"
//             className="nav-link text-white"
//             activeClassName="fw-bold text-primary"
//           >
//             Defect Data Entry
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/losses-master/view"
//             className="nav-link text-white"
//             activeClassName="fw-bold text-primary"
//           >
//             Losses Master
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/losses-data-entry/view"
//             className="nav-link text-white"
//             activeClassName="fw-bold text-primary"
//           >
//             Losses Data Entry
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/productionmaster"
//             className="nav-link text-white"
//             activeClassName="fw-bold text-primary"
//           >
//             Production Master
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { FaTable, FaClipboardList, FaChartBar, FaUser, FaSignInAlt, FaUserPlus, FaBell } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-light text-white vh-100 d-flex flex-column p-3 ">
      {/* <div className="d-flex align-items-center mb-4">
        <div className="rounded-circle bg-light text-dark d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
          <span className="fw-bold">Bajaj</span>
        </div>
        <h5 className="ms-2">Material Dashboard </h5>
      </div> */}

      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <NavLink
            to="/"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaTable className="me-2" />
            Model Master
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/defect-master"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaClipboardList className="me-2" />
            Defect Master
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/losses-master/view"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaChartBar className="me-2" />
            Losses Master Data
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/defect-data-entry/view"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaChartBar className="me-2" />
            Defect data Entry
          </NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
            to="/losses-data-entry/view"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaBell className="me-2" />
            Losses Data Entry
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/productionmaster"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaUser className="me-2" />
            Production Master
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/defectmonthdchart"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaSignInAlt className="me-2" />
            Defect Chart
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/lossesmdchart"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaSignInAlt className="me-2" />
            Losses Chart
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/category-master/create"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaSignInAlt className="me-2" />
            Category Master
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/plant-master/create"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaSignInAlt className="me-2" />
            Plant Master
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/card-master/create"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaSignInAlt className="me-2" />
            Card Master
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/efficiency"
            className="nav-link text-dark d-flex align-items-center fw-bold"
            activeClassName="bg-primary text-white rounded"
          >
            <FaUserPlus className="me-2" />
            Report
          </NavLink>
        </li>
      </ul>

      {/* <div className="mt-auto">
        <button className="btn btn-primary w-100">UPGRADE TO PRO</button>
      </div> */}
    </div>
  );
};

export default Sidebar;
