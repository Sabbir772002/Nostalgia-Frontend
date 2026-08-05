import React from 'react';
import "../ModelProfile/ModelProfile.css";
import ModernDrawer from '../../../Common/ModernDrawer';

function ModelProfile({openEdit,setOpenEdit,handleModel,
                      name,setName,userName,
                      setUserName,countryName,setCountryName,
                      jobName,setJobName
                      }) 
                      {
  return (
    <ModernDrawer
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
      title="Edit Profile Info"
    >
      <form className='modelForm d-flex flex-column gap-3' onSubmit={handleModel}>
        <div>
          <label className="fw-semibold mb-1">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name} 
            required
          />
        </div>

        <div>
          <label className="fw-semibold mb-1">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
        </div>

        <div>
          <label className="fw-semibold mb-1">Country</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Country"
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
            required
          />
        </div>

        <div>
          <label className="fw-semibold mb-1">Profession / Job</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Job"
            onChange={(e) => setJobName(e.target.value)}
            value={jobName}
            required
          />
        </div>

        <button className='btn-modern-primary w-100 py-2 mt-3'>
          Update Profile
        </button>
      </form>
    </ModernDrawer>
  );
}

export default ModelProfile;