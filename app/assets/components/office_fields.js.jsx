var OfficeFields = React.createClass({

  // why do I still have the hidden field for the id?  
  // clean up all this repetitive html attribute nonsense

  getInitialState: function() {
    return { updateDisabled: true }
  },

  enableSubmit: function(e) {
    this.setState({ updateDisabled: false })
  },

  postSave: function(newOffice) {
    this.props.addOffice(newOffice);
  },

  saveOffice: function(e) {
    e.preventDefault();

    var company = this.props.company
    var office = {
      id: this.refs.id.value,
      name: this.refs.name.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      employee_count: this.refs.employee_count.value
    }
    var params = { company_id: company.id, office: office }
    var _this = this;

    if (office.id == "0") {
      console.log("at least office.id == '0'...");
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/offices',
        data: params,
        success: function(response) {
          if (response.errors) {
            var errors = response.errors;
            // globalMessages.addErrorMessage('Oops! Something went wrong! (' + error + ')');
          } else {
            // view.updateShift(shift);
            // SEARCH DASHBOARD FOR 'module.updateShift' for a probs good way of updating react views
            var newOffice = response.new_office
            _this.postSave(newOffice);
          }
          console.log("SUCCESS response:", response)
        },
        error: function(response) {
          console.log("ERROR response:", response)
          // globalMessages.addErrorMessage('Oops! Something went wrong!');
        }
      });
    } else {
      // update office
      office["id"] = this.refs.id.value
    }

    console.log("office:", office);
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
                   ref="id"
                   defaultValue="0" />

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__name'}>Name</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__name'}
                     name={'company[office_rows[' + officeId + ']][name]'}
                     type="text"
                     ref="name"
                     defaultValue={office.name} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__city'}>City</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__city'}
                     name={'company[office_rows[' + officeId + ']][city]'}
                     type="text"
                     ref="city"
                     defaultValue={office.city} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__state'}>State</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__state'}
                     name={'company[office_rows[' + officeId + ']][state]'}
                     type="text"
                     ref="state"
                     defaultValue={office.state} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__employee_count'}>Employee Count</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__employee_count'}
                     name={'company[office_rows[' + officeId + ']][employee_count]'}
                     type="text"
                     ref="employee_count"
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