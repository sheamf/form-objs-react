var NewOffice = React.createClass({

  getInitialState: function() {
    return { showOfficeForm: false }
  },

  addOfficeRow: function() {
    this.setState({ showOfficeForm: true })
  },

  render: function() {
    var company = this.props.company
    var office = { id: 0, name: '', city: '', state: '', employee_count: null }

    if (this.state.showOfficeForm == true) {
      return (
        <OfficeFields key={office.id} company={company} office={office} addOffice={this.props.addOffice}/>
      )

    } else {

      return (
        <div className="col-md-4 company-details">
          <button className="btn"
                  id="add-office-row" 
                  name="button"
                  type="button"
                  onClick={this.addOfficeRow}>Add Another Office</button>
        </div>
      )

    }

  }

});