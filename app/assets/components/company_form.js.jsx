var CompanyForm = React.createClass({

  getInitialState: function() {
    return { company: null, offices: null } // this seems bad
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

  addOffice: function(office) {
    this.state.offices.push(office)
    this.setState({ offices: this.state.offices })
  },

  render: function() {
    console.log("in render fn");
    console.log("this.state", this.state);

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

            <CompanyFields company={this.state.company} />
            <NewOffice company={this.state.company} addOffice={this.addOffice}/>
            <OfficeRows offices={this.state.offices} />

          </div>

        </div>
      </div>
    )
  }

});
