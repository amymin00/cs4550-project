import React from "react";

const Header = () => {
  return (
      <div className="container">
        <h1>Header</h1>

        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">

            <form className="d-flex">
              <input className="form-control me-2" type="search"
                     placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success"
                        type="submit">Search
                </button>
            </form>
            <button className="btn btn-primary float-end">Log in</button>
          </div>
        </nav>



      </div>
  )
};

export default Header;