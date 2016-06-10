var OfficeFields = React.createClass({

  // why do I still have the hidden field for the id?  
  // clean up all this repetitive html attribute nonsense

  getInitialState: function() {
    return { updateDisabled: true, office: this.props.office }
  },

  enableSubmit: function(e) {
    this.setState({ updateDisabled: false })
  },

  postSave: function(newOffice) {
    console.log("in postSave");
    this.props.addOffice(newOffice);
    this.setState({ updateDisabled: true, office: this.props.office })
    this.props.hideForm();
  },

  postUpdate: function(updatedOffice) {
    console.log("in postUpdate");
    this.props.updateOffice(updatedOffice);
    this.setState({ updateDisabled: true, office: this.props.office })
  },

  handleChange: function(name, e) {
    var office = this.state.office;
    office[name] = e.target.value;
    this.setState({ office: office });
  },

  saveOffice: function(e) {
    e.preventDefault();

    var company = this.props.company;
    var office = this.state.office;
    var params = { office, company_id: company.id }
    var _this = this;

    if (office.id == "0") {
      var reqType = 'POST'
      var url = '/offices';
    } else {
      var reqType = 'PUT'
      var url = '/offices/' + office.id;
    }
      $.ajax({
        type: reqType,
        dataType: 'json',
        url: url,
        data: params,
        success: function(response) {
          if (response.errors) {
            var errors = response.errors;
            // globalMessages.addErrorMessage('Oops! Something went wrong! (' + error + ')');
          } else {
            // view.updateShift(shift);
            // SEARCH DASHBOARD FOR 'module.updateShift' for a probs good way of updating react views
            if ('new_office' in response) {
              // at first seems kinda goofy to update state with the server response in postSave, since it should be
              // identical to the current state, but I like it cause it should represent what's actually on the server
              // and if something goofy happens it give the user a chance to see the incorrect whatever
              var newOffice = response.new_office // condense into 1 line
              _this.postSave(newOffice);
            } else {
              var updatedOffice = response.updated_office
              console.log("updatedOffice", updatedOffice);
              _this.postUpdate(updatedOffice);
            }

          }
          console.log("SUCCESS response:", response)
        },
        error: function(response) {
          console.log("ERROR response:", response)
          // globalMessages.addErrorMessage('Oops! Something went wrong!');
        }
      });

  },

  render: function() {
    var officeId = this.state.office.id

    return (
      <fieldset>
        <div>
          <form className="form-inline" onChange={this.enableSubmit} onSubmit={this.saveOffice}>
            <input className="id-field"
                   type="hidden"
                   id={'company_office_rows_' + officeId + '__id'}
                   name={'company[office_rows[' + officeId + ']][id]'}
                   ref="id"
                   value={this.state.office.id}
                   onChange={this.handleChange.bind(this, 'id')} />

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__name'}>Name</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__name'}
                     name={'company[office_rows[' + officeId + ']][name]'}
                     type="text"
                     ref="name"
                     value={this.state.office.name}
                     onChange={this.handleChange.bind(this, 'name')} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__city'}>City</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__city'}
                     name={'company[office_rows[' + officeId + ']][city]'}
                     type="text"
                     ref="city"
                     value={this.state.office.city}
                     onChange={this.handleChange.bind(this, 'city')} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__state'}>State</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__state'}
                     name={'company[office_rows[' + officeId + ']][state]'}
                     type="text"
                     ref="state"
                     value={this.state.office.state}
                     onChange={this.handleChange.bind(this, 'state')} />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor={'company_office_rows_' + officeId + '__employee_count'}>Employee Count</label>
              <input className="form-control"
                     id={'company_office_rows_' + officeId + '__employee_count'}
                     name={'company[office_rows[' + officeId + ']][employee_count]'}
                     type="text"
                     ref="employee_count"
                     value={this.state.office.employee_count}
                     onChange={this.handleChange.bind(this, 'employee_count')} />
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