var OfficeFields = React.createClass({

  // why do I still have the hidden field for the id?  
  // clean up all this repetitive html attribute nonsense

  render: function() {
    var office = this.props.office
    var officeId = office.id

    return (
      <fieldset>
        <div>
          <div className="form-inline">
            <input className="id-field"
                   type="hidden"
                   id={'company_office_rows_' + officeId + '__id'}
                   name={'company[office_rows[' + officeId + ']][id]'}
                   value="1" />

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__name'}>Name</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__name'}
                     name={'company[office_rows[' + officeId + ']][name]'}
                     type="text"
                     value={office.name} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__city'}>City</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__city'}
                     name={'company[office_rows[' + officeId + ']][city]'}
                     type="text"
                     value={office.city} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__state'}>State</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__state'}
                     name={'company[office_rows[' + officeId + ']][state]'}
                     type="text"
                     value={office.state} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__employee_count'}>Employee Count</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__employee_count'}
                     name={'company[office_rows[' + officeId + ']][employee_count]'}
                     type="text"
                     value={office.employee_count} />
            </div>
          </div>
        </div>
      </fieldset>

    )

  }

});