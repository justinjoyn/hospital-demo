import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    componentDidMount = async () => {};

    render() {
        return (
            <SafeAreaView style={common.centeredContainer}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => ({
    rooms: state.rooms.data
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rooms);
