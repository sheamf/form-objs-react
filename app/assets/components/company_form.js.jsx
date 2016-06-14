var CompanyForm = React.createClass({

  getInitialState: function() {
    return { company: { name: null, employee_count: null }, offices: [], context: null }
  },

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
        // wouldn't it be better to not have an id in this case, and just do if id is undefined when choosing
        // whether to send a post or put request in company fields?
        // if that works better, should probs change office fields to work that way too.  
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
    if (this.state.context == null) {

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
