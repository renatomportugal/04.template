class Slider extends React.Component {
  render() {
    let { handleChange, value } = this.props;
    return (
      <div className="weight-slider">
        <h2>How Many Plates Do You Need?</h2>
        <input type="range" min="5" max="600" step="5"
            value={this.props.value}
            onChange={this.props.handleChange}
        />
        <div>{this.props.value} lbs.</div>
      </div>
    );
  }
};

class Plates extends React.Component {
  renderPlate(plate) {
    let plates = [];
    for (let i = 0; i < plate.count / 2; i++) {
      plates.push(
      	<span data-weight={plate.weight}></span>
    	);
    }
    return(plates);
  }

  render() {
    let { plates } = this.props;
    return (
      <section>
        <div className="plates-display">
          <div className="plates-left">
            {Array.from(this.props.plates).reverse().map(plate => {
              return this.renderPlate(plate);
            })}
          </div>
          <div className="plates-right">
            {this.props.plates.map(plate => {
              return this.renderPlate(plate);
            })}
          </div>
        </div>
        <div className="plates-list">
          <div>Assuming a {this.props.plates[0].weight} lb. bar.</div>
          <ul>
            {this.props.plates.map(plate => {
              if(plate.count) return(<li>{plate.count} &times; {plate.weight} lb. plates</li>);
              return null;
            })}
          </ul>
        </div>
      </section>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let bar = 45;
    let value = 145 - bar;
    let weights = [45, 25, 15, 10, 5, 2.5];
    let plates = this.setPlates(value, weights.map((w) => {
      return { weight: w, count: 0, greater: w * 2 };
    }));

    this.state = { value, plates };
  }

  handleChange(event) {
    let value = parseInt(event.target.value);
    let plates = this.setPlates(value, this.state.plates);

    this.setState({ value, plates });
  }

  setPlates(weight, plates) {
    weight = weight - 45;
    return plates.map((p, i) => {
      p.count = 0;
      while (weight >= p.greater) {
        p.count += 2;
        weight -= p.greater;
      }
      return p;
    });
  }

  render() {
    return (
      <div className="page-wrap">
      	<Slider 
          plates={this.state.plates} 
          value={this.state.value} 
          handleChange={(e) => {this.handleChange(e)}} 
        />
      	<Plates plates={this.state.plates} />
    	</div>
    )
  }

};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);