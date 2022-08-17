import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const ReleaseActions = ({ row }) => {
    const install = () => {

    }
    return (
        <>
            <div className="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faBars} className="bars" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <li><button className="dropdown-item" onClick={install()}>Install to Integration</button></li>
                    <li><button className="dropdown-item" onClick={install()}>Install to UAT</button></li>
                    <li><button className="dropdown-item" honClick={install()}>Install to PROD</button></li>
                </ul>
            </div>
        </>
    )
}