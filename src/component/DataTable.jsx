
import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({ data: rowData }) => {
    const rowsPerPage = 5; // Number of rows per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the data to display for the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rowData.slice(indexOfFirstRow, indexOfLastRow);

    // Handle page change
    const handleNextPage = () => {
        if (currentPage < Math.ceil(rowData.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <section aria-label="table" className="tableContainer">
            <table id="data-table">
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Percentage funded</th>
                        <th>Amt. Pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows && currentRows.length > 0 ? (
                        currentRows.map((item) => (
                            <tr key={item.sNo}>
                                <td>{item.sNo}</td>
                                <td>{item.percentagefunded}</td>
                                <td>{item.amtPledged}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No Data Available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>{`Page ${currentPage}`}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(rowData.length / rowsPerPage)}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default DataTable;


