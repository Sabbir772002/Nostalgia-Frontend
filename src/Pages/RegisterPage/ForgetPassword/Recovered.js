import React from "react";
import { useContext } from "react";
import { useState } from 'react';

export default function Reset() {
  const { page,setPage } =useState(
    {
      username: "",
      email: "",
    }
  );

  function changePassword() {
    //setPage("recovered");
  }

  return (
    <div>
      <section className="bg-light w-screen">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-5 shadow-sm">
                <h2 className="mb-4 text-center">Change Password</h2>
                <form className="mb-4">
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-check mb-4">
                    <input
                      id="newsletter"
                      aria-describedby="newsletter"
                      type="checkbox"
                      className="form-check-input"
                      required
                    />
                    <label htmlFor="newsletter" className="form-check-label">
                      I accept the{" "}
                      <a href="#" className="text-primary">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={changePassword}
                    className="btn btn-primary w-100"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
