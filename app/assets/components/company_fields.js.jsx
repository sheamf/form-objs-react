var CompanyFields = React.createClass({

  getDefaultProps: function() {
    return { company: { name: '', employee_count: '' } }
  },

  getInitialState: function() {
    return { updateDisabled: true, company: this.props.company }
  },

  enableSubmit: function() {
    this.setState({ updateDisabled: false })
  },

  postUpdate: function(updatedCompany) {
    this.props.updateCompany(updatedCompany);
    this.setState({ company: updatedCompany });
  },

  handleChange: function(name, e) {
    var company = this.state.company;
    company[name] = e.target.value;
    this.setState({ company: company });
  },

  saveCompany: function(e) {
    e.preventDefault();

    var company = this.state.company;
    var reqType = 'PUT';
    var url = '/companies/' + company.id;
    var params = { company }
    var _this = this;

    $.ajax({
      type: reqType,
      dataType: 'json',
      url: url,
      data: params,
      success: function(response) {
        if (response.errors) {
          console.log("SUCCESS response.errors:", response.errors);
        } else {
          console.log("SUCCESS response:", response);
          _this.postUpdate(response.company);
        }
      },

      error: function(response) {
        console.log("ERROR response:", response)        
      }

    });

  },

  render: function() {
    return (

      <form className="col-md-4 company-details" onChange={this.enableSubmit} onSubmit={this.saveCompany}>
        <h3>Company Details</h3>

        {/* TODO consider breaking up these input fields into their own components for reusability */}
        
        <div className="form-group">
          <label className="control-label" htmlFor="company_name">Name</label>
          <input className="form-control"
                 id="company_name" 
                 name="company_name" 
                 type="text" 
                 value={this.state.company.name}
                 onChange={this.handleChange.bind(this, 'name')} />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="company_employee_count">Employee Count</label>
          <input className="form-control"
                 id="company_employee_count" 
                 name="company_employee_count" 
                 type="text" 
                 value={this.state.company.employee_count}
                 onChange={this.handleChange.bind(this, 'employee_count')} />                
        </div>

        <div>
          <input className="btn btn-primary"
                 name="commit"
                 type="submit"
                 value="Update" 
                 disabled={this.state.updateDisabled} />
        </div>

      </form>
  
    )
  }

});
