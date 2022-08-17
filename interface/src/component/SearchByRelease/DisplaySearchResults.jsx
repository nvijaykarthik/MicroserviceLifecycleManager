import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faFloppyDisk, faPlusCircle, faSpinner, faCheckCircle, faMinusCircle, faClose } from '@fortawesome/free-solid-svg-icons'

export const DisplaySearchResults = ({ serviceImpactDetailsList }) => {

    const columns = [
        {
            name: 'Story Number',
            selector: row => row.storyNumber,
            grow: 25,
        },
        {
            name: 'Impacted Service Name',
            selector: row => row.impactedServiceName,
            grow: 60,
        },
        {
            name: 'Should Install?',
            selector: row => row.install,
            grow: 25,
        },
        {
            name: 'Should Restart Server?',
            selector: row => row.restart,
            grow: 40,
        },
        {
            name: 'Should Clear Cache?',
            selector: row => row.cacheClear,
            grow: 40,
        },
        {
            name: 'Has DB Change?',
            selector: row => row.dbChange,
            grow: 30,
        },
        {
            name: 'DB Change Commit URL',
            selector: row => row.dbChangeCommitUrl,
            grow: 100,
        },
        {
            name: 'Has Code Changes?',
            selector: row => row.codeChange,
            grow: 25,
        },
        {
            name: 'Code Change Commit Url',
            selector: row => row.codeChangeCommitUrl,
            grow: 100,
        },
    ];



    
    return (
        <>
            <DataTable
                title="List of Impacted Services"
                responsive
                striped
                highlightOnHover
                pointerOnHover
                columns={columns}
                data={serviceImpactDetailsList}
            />
        </>
    )
}