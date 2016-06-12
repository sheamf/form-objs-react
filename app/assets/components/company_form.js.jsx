var CompanyForm = React.createClass({

  getInitialState: function() {
    return { company: null, offices: null, context: null }
  },

  componentDidMount: function() {
    $.get(this.props.companyFormPath, function(response) {
      console.log("response:", response);
      console.log("typeof(response.company):", typeof(response.company));

      if (typeof(response.company) !== 'undefined') {
        var company = response.company  
        var offices = response.office_rows
        var context = 'edit'
      } else {
        var company = { name: '', employee_count: 0 }
        // wouldn't it be better to not have an id in this case, and just do if id is undefined when choosing
        // whether to send a post or put request in company fields?
        // if that works better, should probs change office fields to work that way too.  
        var offices = null
        var context = 'new'
      }
      
      this.setState({
        company: company, offices: offices, context: context
      })
    }.bind(this));
  },

  updateCompany: function(company) {
    this.setState({ company: company});
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
      // this.state itself is also null the first time through, but don't want to use that as a check b/c if
      // I later end up setting some other state it will pass before the ajax response and break everything
      return null

    } else if (this.state.context == 'new') {

      return  (
        <div id='company-form'>
          <div className="row">
            <CompanyFields company={this.state.company} context={this.state.context} />
            <NewOffice company={this.state.company} addOffice={this.addOffice}/>
          </div>
        </div>
      )  

    } else if (this.state.context == 'edit') {

      return  (
        <div id='company-form'>
          <div className="row">
            <CompanyFields company={this.state.company} context={this.state.context} updateCompany={this.updateCompany} />
            <NewOffice company={this.state.company} addOffice={this.addOffice}/>
            <OfficeRows company={this.state.company} offices={this.state.offices} updateOffice={this.updateOffice}/>
          </div>
        </div>
      )
    }
  }

});
