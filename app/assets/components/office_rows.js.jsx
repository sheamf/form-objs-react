var OfficeRows = React.createClass({

  render: function() {
    console.log("this.props.offices", this.props.offices);

    var numOffices = this.props.offices.length;
    var rows = [];

    this.props.offices.map(function(office) {
      rows.push(<OfficeFields key={office.id} office={office} />)
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