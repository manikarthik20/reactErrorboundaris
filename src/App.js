import React from "react";

class ErrorBoundary extends React.Component {

  // Constructor for initializing Variables etc in a state
  // Just similar to initial line of useState if you are familiar
  // with Functional Components
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  // This method is called if any error is encountered
  componentDidCatch(error, errorInfo) {

    // Catch errors in any components below and
    // re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error
    // reporting service here
  }
  // This will render this component wherever called
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>An Error Has Occurred</h2>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children, i.e. in
    // case no error is Found
    return this.props.children;
  }
}
// This is a component for Counter,Named Counter
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  }
  render() {
    if (this.state.counter === 3) {

      // Simulate a JS error
      throw new Error('Crashed!!!!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}
function App() {
  return (
    <div style={{ marginLeft: '30px', marginTop: '50px' }}>
      <div style={{ textAlign: "center" }}>
        <h1>
          <strong>To see the working of Error boundaries
            click on the Counters to increase the value
          </strong>
        </h1>
        <p>
          Program is made such a way that as soon as the counter
          reaches the value of 3, Error boundaries will throw an
          error.
        </p>
      </div>
      <hr style={{ width: "500px" }} />
      <ErrorBoundary>
        <p>
          These two counters are inside the same error boundary.
          If one crashes, then the effect will be done on both
          as the error boundary will replace both of them.
        </p>
        <Counter />
        <Counter />
      </ErrorBoundary>
      <hr style={{ width: "500px" }} />
      <p>
        These two counters are each inside of their
        own error boundary. So if one crashes, the
        other is not affected.
      </p>
      <ErrorBoundary><Counter /></ErrorBoundary>
      <ErrorBoundary><Counter /></ErrorBoundary>
    </div>
  );
}
export default App;
