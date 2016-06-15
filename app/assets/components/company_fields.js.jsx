var CompanyFields = React.createClass({

  getInitialState: function() {
    return { updateDisabled: true, company: this.props.company }
  },

  // componentWillReceiveProps: function(nextProps) {
    // console.log("in CompanyFields, componentWillReceiveProps");
  // },

  // componentWillUpdate: function(nextProps, nextState) {
  //   console.log("in CompanyFields, componentWillUpdate...nextProps:", nextProps);
  //   console.log("...nextState:", nextState);
  // },

  enableSubmit: function() {
    this.setState({ updateDisabled: false })
  },

  postSave: function(company) {
    console.log("in CompanyFields, postSave");
    this.props.saveCompany(company);
    this.setState({ updateDisabled: true });
  },

  handleChange: function(name, e) {
    var company = this.state.company;
    company[name] = e.target.value;
    this.setState({ company: company });
  },

  saveCompany: function(e) {
    e.preventDefault();

    var company = this.state.company;
    var params = { company }
    var _this = this;

    if (this.props.context == 'new') {
      var reqType = 'POST';
      var url = '/companies'
    } else if (this.props.context == 'edit') {
      var reqType = 'PUT';
      var url = '/companies/' + company.id;
    }

    $.ajax({
      type: reqType,
      dataType: 'json',
      url: url,
      data: params,
      success: function(response) {
        if (response.errors) {
        } else {
          _this.postSave(response.company);
        }
      },

      error: function(response) {   
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
                 value="Save" 
                 disabled={this.state.updateDisabled} />
        </div>

      </form>
  
    )
  }

});
