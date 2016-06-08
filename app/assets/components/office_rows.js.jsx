var OfficeRows = React.createClass({

  render: function() {
    var thisProps = this.props;
    var numOffices = this.props.offices.length;
    var rows = [];

    this.props.offices.map(function(office) {
      rows.push(<OfficeFields key={office.id} 
                              office={office} 
                              company={thisProps.company} 
                              updateOffice={thisProps.updateOffice} />)
    })

    return (

      <div className="col-md-12">
        <h3>Offices</h3>
        <legend></legend>

        {rows}

      </div>

    )

  }

});