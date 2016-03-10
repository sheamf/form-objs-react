var CompanyForm = React.createClass({

  render: function() {
    return  (
      <div>
        <h3>{this.props.title}</h3>
        <div id='company-form'>
          <div className="row">
            {/* use props directly in render rather in getInitialState and then doing this.state.companyName 
                in render: https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html */}
            <CompanyFields companyName={this.props.companyName} companyEmployeeCount={this.props.companyEmployeeCount} />

          </div>
        </div>
      </div>
    )
  }

});
