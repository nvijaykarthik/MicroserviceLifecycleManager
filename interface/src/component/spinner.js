import React from "react";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="modal overlay" >
      <div className="modal-dialog  modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}