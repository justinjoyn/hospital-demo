import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';
import { Appbar } from 'react-native-paper';

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    componentDidMount() {}

    render() {
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
                <Appbar>
                    <Appbar.Content title="Rooms" subtitle="Select a room to view details" />
                </Appbar>
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
