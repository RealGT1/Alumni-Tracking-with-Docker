// SearchBar.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/employee")
            .then((result) => {
                if (result.data.Status) {
                    setEmployees(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setFilteredEmployees(
            employees.filter((employee) =>
                employee.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, employees]);

    return (
        <div className="relative text-gray-600">

            <input
                type="search"
                placeholder="Search Alumni"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border border-gray-300 "
            />

            <button type="submit" className="absolute right-0 top-0 mt-[12px] mr-4">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }} xml:space="preserve" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
            </button>

            <div className="dropdown-menu w-full rounded-lg mt-0.5 hover:border-transparent hover:shadow-lg" aria-labelledby="dropdownMenuButton" style={{ display: search.length > 0 ? 'block' : 'none' }}>
                {filteredEmployees.map((employee) => (
                    <Link to={`/employee/${employee.id}`} key={employee.id} className="dropdown-item">
                        {employee.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
