
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './AGDataTable.css';
import { columnDefs } from '../constant/table';

const AGDataTable = (props) => {
    console.log(props.data[0]);
    const [colDefs, setColDefs] = useState(columnDefs);
    const [rowData, setRowData] = useState(props.data);

    return (
        <section aria-label="table" className='tableContainer'>
            {rowData && rowData.length > 0 ? (
                <AgGridReact
                    pagination
                    paginationPageSize={5}
                    paginationPageSizeSelector={[5, 10, 15]}
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            ) : (
                <div>No Data Available</div> // Handle the case where no data is present
            )}
        </section>
    );
};

export default AGDataTable;


