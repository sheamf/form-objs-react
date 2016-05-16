var OfficeFields = React.createClass({

  // why do I still have the hidden field for the id?  
  // clean up all this repetitive html attribute nonsense

  getInitialState: function() {
    return { updateDisabled: true }
  },

  enableSubmit: function(e) {
    this.setState({ updateDisabled: false })
  },

  saveOffice: function(e) {

  },

  render: function() {
    var office = this.props.office
    var officeId = office.id

    return (
      <fieldset>
        <div>
          <form className="form-inline" onChange={this.enableSubmit} onSubmit={this.saveOffice}>
            <input className="id-field"
                   type="hidden"
                   id={'company_office_rows_' + officeId + '__id'}
                   name={'company[office_rows[' + officeId + ']][id]'}
                   defaultValue="1" />

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__name'}>Name</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__name'}
                     name={'company[office_rows[' + officeId + ']][name]'}
                     type="text"
                     defaultValue={office.name} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__city'}>City</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__city'}
                     name={'company[office_rows[' + officeId + ']][city]'}
                     type="text"
                     defaultValue={office.city} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__state'}>State</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__state'}
                     name={'company[office_rows[' + officeId + ']][state]'}
                     type="text"
                     defaultValue={office.state} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__employee_count'}>Employee Count</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__employee_count'}
                     name={'company[office_rows[' + officeId + ']][employee_count]'}
                     type="text"
                     defaultValue={office.employee_count} />
            </div>

            <input className="btn btn-primary"
              name="commit"
              type="submit"
              value="Save"
              disabled={this.state.updateDisabled} />
          </form>
        </div>
      </fieldset>

    )

  }

});