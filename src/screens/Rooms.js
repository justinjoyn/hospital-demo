import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddFAB from '../components/AddFAB';
import AddRoomModal from '../components/AddRoomModal';
import AddDepartmentModal from '../components/AddDepartmentModal';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addRoomModalVisible: false,
            addDepartmentVisible: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    componentDidMount() {}

    render() {
        const { addRoomModalVisible, addDepartmentVisible } = this.state;
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
                <Appbar>
                    <Appbar.Content title="Rooms" subtitle="Select a room to view details" />
                </Appbar>
                <AddFAB
                    addRoom={() => this.setState({ addRoomModalVisible: true })}
                    addDepartment={() => this.setState({ addDepartmentVisible: true })}
                />
                <AddRoomModal
                    addRoom={() => console.log('Room')}
                    visible={addRoomModalVisible}
                    onCancel={() => this.setState({ addRoomModalVisible: false })}
                />
                <AddDepartmentModal
                    onAdd={() => console.log('Room')}
                    visible={addDepartmentVisible}
                    onCancel={() => this.setState({ addDepartmentVisible: false })}
                />
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
