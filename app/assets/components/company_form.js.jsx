var CompanyForm = React.createClass({

  getInitialState: function() {
    return { company: null, offices: null }
  },

  componentDidMount: function() {
    $.get(this.props.companyFormPath, function(response) {
      console.log("response:", response);
      var company = response.company
      this.setState({
        company: response.company, offices: response.office_rows
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
    if (this.state.company == null) {
      // this.state itself is also null the first time through, but don't want to use that as a check b/c if
      // I later end up setting some other state it will pass before the ajax response and break everything
      return null
    }
    return  (
      <div>
        <h3>{this.props.title}</h3>
        <div id='company-form'>
          <div className="row">

            <CompanyFields company={this.state.company} updateCompany={this.updateCompany} />
            <NewOffice company={this.state.company} addOffice={this.addOffice}/>
            <OfficeRows company={this.state.company} offices={this.state.offices} updateOffice={this.updateOffice}/>

          </div>

        </div>
      </div>
    )
  }

});
