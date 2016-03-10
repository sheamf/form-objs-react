var CompanyFields = React.createClass({

  render: function() {
    return (

      <div className="col-md-4 company-details">
        <h3>Company Details</h3>

        {/* TODO consider breaking up these input fields into their own components for reusability */}
        
        <div className="form-group">
          <label className="control-label" htmlFor="company_name">Name</label>
          <input className="form-control"
                 id="company_name" 
                 name="company_name" 
                 type="text" 
                 value={this.props.companyName} />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="company_employee_count">Employee Count</label>
          <input className="form-control"
                 id="company_employee_count" 
                 name="company_employee_count" 
                 type="text" 
                 value={this.props.companyEmployeeCount} />                
        </div>
      </div>
  
    )
  }

});
