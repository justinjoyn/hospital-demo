import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';

class Patients extends Component {
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
                    <Appbar.Content title="Patients" subtitle="Select a patient to view details" />
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
)(Patients);
