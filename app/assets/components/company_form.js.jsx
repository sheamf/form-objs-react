var CompanyForm = React.createClass({

  getInitialState: function() {
    return { company: '', offices: '' }
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

  render: function() {
    console.log("in render fn");
    return  (
      <div>
        <h3>{this.props.title}</h3>
        <div id='company-form'>
          <div className="row">

            <CompanyFields company={this.state.company} />

          </div>
        </div>
      </div>
    )
  }

});
