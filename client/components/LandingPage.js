    import React, { Component, PropTypes } from 'react';
    import { Link } from 'react-router';
    import $ from 'jquery';
    import { Carousel } from 'react-bootstrap';
    import Bar from './templates/horizontalBar';
    class LandingPage extends Component {

        constructor(props, context) {
            super(props, context);

            this.state = { index: 0, direction: null };
        }

        handleSelect(selectedIndex, e) {
            alert('selected=' + selectedIndex + ', direction=' + e.direction);
            this.setState({
                index: selectedIndex,
                direction: e.direction
            });
        }

        static contextTypes = {
            router: PropTypes.object
        };
        componentWillUnmount() {
            this.props.resetMe();
        }

        render() {
            return ( < div >
                <
                /div>
            );
        }
    }


    export default LandingPage