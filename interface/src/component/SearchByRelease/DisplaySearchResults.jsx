import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faFloppyDisk, faPlusCircle, faSpinner, faCheckCircle, faMinusCircle, faClose } from '@fortawesome/free-solid-svg-icons'

export const DisplaySearchResults = ({ serviceImpactDetailsList }) => {

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Story Number',
            selector: row => row.storyNumber,
        },
        {
            name: 'Impacted Service Name',
            selector: row => row.impactedServiceName,
        },
        {
            name: 'Should Install?',
            selector: row => row.install,
        },
        {
            name: 'Should Restart Server?',
            selector: row => row.restart,
        },
        {
            name: 'Should Clear Cache?',
            selector: row => row.cacheClear,
        },
        {
            name: 'Has DB Change?',
            selector: row => row.dbChange,
        },
        {
            name: 'DB Change Commit URL',
            selector: row => row.dbChangeCommitUrl,
        },
        {
            name: 'Has Code Changes?',
            selector: row => row.codeChange,
        },
        {
            name: 'Code Change Commit Url',
            selector: row => row.codeChangeCommitUrl,
        },
    ];

    const data = [
        {
            id: 1,
            storyNumber: 'OST-2564',
            impactedServiceName:'loan-rate-calculation-service',
            install:'Yes',
            restart:'Yes',
            cacheClear:'Yes',
            dbChange:'Yes',
            dbChangeCommitUrl:'https://bitbucket.org/db_changes',
            codeChange:'Yes',
            codeChangeCommitUrl:'https://bitbucket.org/code_changes',
        },
        {
            id: 2,
            storyNumber: 'OST-2523',
            impactedServiceName:'loan-account-information-service',
            install:'Yes',
            restart:'No',
            cacheClear:'No',
            dbChange:'No',
            dbChangeCommitUrl:'',
            codeChange:'Yes',
            codeChangeCommitUrl:'https://bitbucket.org/code_changes',
        },
    ]
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
            />
        </>
    )
}