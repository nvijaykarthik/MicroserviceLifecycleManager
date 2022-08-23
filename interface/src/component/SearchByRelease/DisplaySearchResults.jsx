import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { ReleaseActions } from './ReleaseActions'
import Spinner from "../spinner";

export const DisplaySearchResults = ({ serviceImpactDetailsList, showSpinner }) => {

    const displaySpinner = () => showSpinner ? <Spinner/> : ''

    const greenOrAmber = flag =>
        flag ?
            <FontAwesomeIcon icon={faCheckCircle} className="txtIcongreen" />
            :
            <FontAwesomeIcon icon={faMinusCircle} className="txtIconamber" />
    
    const showWrappedData = colData => <div className="text-wrap">{colData}</div>

    const columns = [
        {
            name: 'Actions',
            cell: row => <ReleaseActions size="small" row={row} />,
            allowOverflow: true,
            button: true,
            width: '56px',
        },
        {
            name: 'Story Number',
            cell: row => showWrappedData(row.storyNumber),
            sortable: true,
            grow: 50,
        },
        {
            name: 'Impacted Service Name',
            cell: row => showWrappedData(row.impactedServiceName),
            sortable: true,
            grow: 90,
        },
        {
            name: 'Should Install?',
            cell: row => greenOrAmber(row.install),
            allowOverflow: true,
            grow: 25,
        },
        {
            name: 'Should Restart Server?',
            cell: row => greenOrAmber(row.restart),
            grow: 40,
        },
        {
            name: 'Should Clear Cache?',
            cell: row => greenOrAmber(row.cacheClear),
            grow: 40,
        },
        {
            name: 'Has DB Change?',
            cell: row => greenOrAmber(row.dbChange),
            grow: 30,
        },
        {
            name: 'DB Change Commit URL',
            cell: row => showWrappedData(row.dbChangeCommitUrl),
            grow: 100,
        },
        {
            name: 'Has Code Changes?',
            cell: row => greenOrAmber(row.codeChange),
            grow: 25,
        },
        {
            name: 'Code Change Commit Url',
            cell: row => showWrappedData(row.codeChangeCommitUrl),
            grow: 100,
        },
    ];

    return (
        <>
            {displaySpinner()}
            <DataTable
                title="List of Impacted Services"
                responsive
                striped
                highlightOnHover
                columns={columns}
                data={serviceImpactDetailsList}
            />
        </>
    )
}