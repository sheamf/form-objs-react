var TestComponent = React.createClass({

  render: function() {
    return (<div><h5>test component has reacted</h5></div>);
  }
  // render() { return (<div><h5>test component has reacted</h5></div>) }
  // these two appear to be equivalent

});



var HelloUser = React.createClass({
  getInitialState: function(){
    return {
      usernames: '@sheamfr'
    }
  },
  handleChange: function(e){
    this.setState({
      usernames: e.target.value
    });
  },
  render: function(){
    return (
      <div>
        Hello {this.state.usernames} <br />
        Change Names: <input type="text" value={this.state.usernames} onChange={this.handleChange} />
      </div>
    )
  }
});


var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      name: 'Miles Shea',
      friends: ['no one :(', 'maybe my dog', '?']
    }
  },
  addFriend: function(friend) {
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render: function(){
    console.log("this.state.friends", this.state.friends);
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        <ShowList names={this.state.friends} />
        <AddFriend addNew = { this.addFriend } />
      </div>
    )
  }
});

var AddFriend = React.createClass({
  getInitialState: function() {
    return { newFriend: '' }
  },
  updateNewFriend: function(e) {
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function() {
    this.props.addNew(this.state.newFriend);
    this.setState({ newFriend: '' });
  },
  render: function() {
    return (
      <div>
        <input type="text" value={ this.state.newFriend }
               onChange={ this.updateNewFriend } />
        <button onClick={ this.handleAddNew }> Add Friend </button>
      </div>
    );
  }
});

var ShowList = React.createClass({
  render: function() {
    var listItems = this.props.names.map(function(friend) {
      return (
        <li> { friend } </li>
      );
    });
    return (
      <div>
        <h3>Friends</h3>
        <ul>
          { listItems }
        </ul>
      </div>
    )
  }
});




///////////////////////////////////////////////////////////// Searchable product table example

var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

var FilterableProductTable = React.createClass({
  getDefaultProps: function() {
    return { products: PRODUCTS }
  },
  render: function() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
});
 
// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('container')
// );












