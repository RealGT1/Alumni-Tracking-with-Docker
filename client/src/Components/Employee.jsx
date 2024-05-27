import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from 'xlsx';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [batchYearFilter, setBatchYearFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedColumn, setSortedColumn] = useState('');
  const itemsPerPage = 8;

  // Add this to your state variables
  const [sortDirection, setSortDirection] = useState('asc');

  const handleBatchYearChange = (event) => {
    setBatchYearFilter(event.target.value);
  };

  useEffect(() => {
    setFilteredEmployees(
      employee.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) &&
        (batchYearFilter === '' || e.batch === parseInt(batchYearFilter))
      )
    );
  }, [search, employee, batchYearFilter]);

  // Add this function
  const handleSort = (columnName) => {
    let direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);
    setSortedColumn(columnName); // Add this line

    let sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[columnName] > b[columnName]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredEmployees(sortedEmployees);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(firstItemIndex, lastItemIndex);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEmployees.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const Pagination = () => (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => setCurrentPage(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );


  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: '#employeeTable' });
    doc.save('employees.pdf');
  }

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(employee);
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, 'employees.xlsx');
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      axios.delete('http://localhost:3000/auth/delete_employee/' + id)
        .then(result => {
          if (result.data.Status) {
            window.location.reload()
          } else {
            alert(result.data.Error)
          }
        })
    }
  }

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, id]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(employeeId => employeeId !== id));
    }
  }

  const handleSendMail = () => {
    console.log(selectedEmployees)
    console.log('Mail sent')
  }

  const handleSelectAllChange = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedEmployees(employee.map(e => e.id));
    } else {
      setSelectedEmployees([]);
    }
  }

  return (
    <div className="px-5 mt-3">
      <div className="pt-2 relative mx-auto text-gray-600 flex items-center justify-center w-full">
        <input
          type="search"
          name="search"
          placeholder="Search Alumni"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded  text-sm focus:outline-none"
        />
        <button type="submit" className="-ml-11">
          <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }} xml:space="preserve"
            width="500px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>


      <div className="fixed top-0 right-0 ">
        <button
          onClick={exportExcel}
          className="bg-green-600 text-white active:bg-green-900 font-bold uppercase text-sm px-3 py-2 mt-1 mr-3 hover:bg-green-700 rounded shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150"
        >
          Export to Excel
        </button>
      </div>
      <div className="d-flex justify-content-center">

      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Alumni
      </Link>
      <div className="flex justify-end items-center mb-2 mr-3">
        <div className="flex items-center mr-4">

          <div className="relative border-2">
            <select
              id="batchYear"
              value={batchYearFilter}
              onChange={handleBatchYearChange}
              className="appearance-none h-8 pl-3 pr-6 text-gray-600 bg-white rounded focus:outline-none"
            >
              <option value="">Select batch year</option>
              {[...Array(11).keys()].map(i =>
                <option key={i} value={2015 + i}>{2015 + i}</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6h12l-6 6z" /></svg>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <label htmlFor="selectAll" className="mr-2 font-bold text-gray-700">Select All</label>
          <input
            id="selectAll"
            type="checkbox"
            className="transform scale-150 ml-2"
            checked={selectAll}
            onChange={(event) => handleSelectAllChange(event.target.checked)}
          />
        </div>
      </div>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th className=" w-24" onClick={() => handleSort('name')}>
                Name {sortedColumn === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>Profile</th>
              <th onClick={() => handleSort('email')}>
                Email {sortedColumn === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>Company</th>
              <th className="" onClick={() => handleSort('category_name')}>
                Role {sortedColumn === 'category_name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSort('linkedin')}>
                LinkedIn {sortedColumn === 'linkedin' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSort('batch')}>
                Batch  {sortedColumn === 'batch' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className=" w-40">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedEmployees.map((e, index) => (
              <tr>
                <td>{firstItemIndex + index + 1}</td>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.company}</td>

                <td>{e.category_name}</td>
                <td>{e.linkedin}</td>
                <td>{e.batch}</td>

                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>

                </td>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <input type="checkbox" style={{ transform: "scale(1.2)", marginTop: '10px' }} checked={selectAll || selectedEmployees.includes(e.id)} onChange={(event) => handleCheckboxChange(e.id, event.target.checked)} />
                </div>

              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <Pagination />
        </div>
        <div className="fixed bottom-0 right-0 p-3">
          <button
            onClick={handleSendMail}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee;