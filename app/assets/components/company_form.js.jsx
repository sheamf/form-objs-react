var CompanyForm = React.createClass({

  getInitialState: function() {
    return { company: { name: null, employee_count: null }, offices: [], context: null }
  },

  // componentWillReceiveProps: function(nextProps) {
  //   console.log("in CompanyForm, componentWillReceiveProps");
  // },

  // componentWillUpdate: function(nextProps, nextState) {
  //   console.log("in CompanyForm, componentWillUpdate...nextProps:", nextProps);
  //   console.log("...nextState:", nextState);
  // },

  componentDidMount: function() {
    $.get(this.props.companyFormPath, function(response) {
      console.log("response:", response);

      var context;

      if (typeof(response.company) !== 'undefined') {
        var company = response.company  
        var offices = response.office_rows
        context = 'edit'

        this.setState({
          company: company, offices: offices, context: context
        })
      } else {
        context = 'new'
        this.setState({ context: context })
      }

    }.bind(this));
  },

  saveCompany: function(company) {
    this.setState({ company: company, context: 'edit' });
  },

  addOffice: function(office) {
    this.state.offices.push(office)  
    this.setState({ offices: this.state.offices })
  },

  updateOffice: function(office) {
    var officeIdx = this.state.offices.findIndex(o => o.id == office.id);

    if (officeIdx !== -1) {
      this.state.offices[officeIdx] = office
    }
    this.setState({ offices: this.state.offices })
  },

  render: function() {
    console.log("in render fn");
    if (this.state.context == null) { // reverse to be if this.state.context, then return shit, else return null

      return null

    } else {

      return  (
        <div id='company-form'>
          <div className="row">
            <CompanyFields company={this.state.company} context={this.state.context} saveCompany={this.saveCompany} />

            {this.state.context == 'edit' ? (
              <NewOffice company={this.state.company} addOffice={this.addOffice}/>
            ) :
            null}            
            
            {this.state.offices ? (
              <OfficeRows company={this.state.company} offices={this.state.offices} updateOffice={this.updateOffice}/>
            ) : 
            null}
          </div>
        </div>
      )
    }
  }

});
