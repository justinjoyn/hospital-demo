import React, { Component } from 'react';
import { FlatList, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { Appbar, List } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { DEPARTMENTS, DOCTORS, PATIENTS, ROOMS } from '../common/constants';
import { log } from '../common/utils';
import AddDepartmentModal from '../components/AddDepartmentModal';
import AddDoctorModal from '../components/AddDoctorModal';
import AddFAB from '../components/AddFAB';
import AddPatientModal from '../components/AddPatientModal';
import AddRoomModal from '../components/AddRoomModal';
import RoomDetailsModal from '../components/RoomDetailsModal';
import { setDepartments } from '../ducks/departments';
import { setDoctors } from '../ducks/doctors';
import { setPatients } from '../ducks/patients';
import { setRooms } from '../ducks/rooms';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';
import _ from 'lodash';

class Rooms extends Component {
    constructor(props) {
        super(props);
        //Firestore refs
        this.roomsRef = firebase.firestore().collection(ROOMS);
        this.patientsRef = firebase.firestore().collection(PATIENTS);
        this.doctorsRef = firebase.firestore().collection(DOCTORS);
        this.departmentsRef = firebase.firestore().collection(DEPARTMENTS);

        this.state = {
            addRoomModalVisible: false,
            addPatientModalVisible: false,
            addDoctorModalVisible: false,
            addDepartmentVisible: false,
            roomDetailsModalVisible: false,
            rooms: [],
            doctors: [],
            departments: [],
            patients: [],
            selectedRoom: null
        };

        //Bind to instance
        this.onRoomsUpdate = this.onRoomsUpdate.bind(this);
        this.onPatientsUpdate = this.onPatientsUpdate.bind(this);
        this.onDoctorsUpdate = this.onDoctorsUpdate.bind(this);
        this.onDepartmentsUpdate = this.onDepartmentsUpdate.bind(this);
        this.renderRoom = this.renderRoom.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    componentDidMount() {
        this.unsubscribeRooms = this.roomsRef.onSnapshot(this.onRoomsUpdate);
        this.unsubscribePatients = this.patientsRef.onSnapshot(this.onPatientsUpdate);
        this.unsubscribeDoctors = this.doctorsRef.onSnapshot(this.onDoctorsUpdate);
        this.unsubscribeDepartments = this.departmentsRef.onSnapshot(this.onDepartmentsUpdate);
    }

    componentWillUnmount() {
        this.unsubscribeRooms();
        this.unsubscribePatients();
        this.unsubscribeDoctors();
        this.unsubscribeDepartments();
    }

    onRoomsUpdate = async querySnapshot => {
        const rooms = [];
        querySnapshot.forEach(doc => {
            const { number, patient } = doc.data();
            rooms.push({ doc, key: doc.id, number, patient: patient });
        });
        log('Rooms', 'green', rooms);
        this.setState({ rooms: rooms });
        this.props.setRooms(rooms);
    };

    onPatientsUpdate(querySnapshot) {
        const patients = [];
        querySnapshot.forEach(doc => {
            const { name, doctor, department, room } = doc.data();
            patients.push({
                doc,
                key: doc.id,
                name,
                doctor: doctor,
                department: department,
                room: room
            });
        });
        log('Patients', 'green', patients);
        this.setState({ patients: patients });
        this.props.setPatients(patients);
        this.processPatients(patients);
    }

    processPatients = async data => {
        let patients = data;
        for (let i = 0; i < patients.length; i++) {
            let room = await patients[i].room.get();
            let doctor = await patients[i].doctor.get();
            let department = await doctor.data().department.get();

            patients[i].parsedRoom = room.data();
            patients[i].parsedDoctor = doctor.data();
            patients[i].parsedDepartment = department.data();
        }
        this.setState({ patients: patients });
        this.props.setPatients(patients);
    };

    onDoctorsUpdate(querySnapshot) {
        const doctors = [];
        querySnapshot.forEach(doc => {
            const { name } = doc.data();
            doctors.push({ doc, key: doc.id, name });
        });
        log('Doctors', 'green', doctors);
        this.setState({ doctors: doctors });
        this.props.setDoctors(doctors);
    }

    onDepartmentsUpdate(querySnapshot) {
        const departments = [];
        querySnapshot.forEach(doc => {
            const { name } = doc.data();
            departments.push({ doc, key: doc.id, name });
        });
        log('Departments', 'green', departments);
        this.setState({ departments: departments });
        this.props.setDepartments(departments);
    }

    getPatientCount(room) {
        const { patients } = this.props;
        let count = 0;
        patients.map(patient => {
            const patientRoom = _.get(patient, 'room.id', null);
            if (patientRoom === room.key) count++;
        });
        return count;
    }

    renderRoom({ item }) {
        const patientCount = this.getPatientCount(item);
        return (
            <List.Item
                onPress={() =>
                    patientCount !== 0
                        ? this.setState({ selectedRoom: item, roomDetailsModalVisible: true })
                        : null
                }
                title={`Room #${item.number}`}
                description={
                    patientCount === 0
                        ? 'This room is vacant'
                        : `This room has ${patientCount} patients`
                }
                left={props => <List.Icon {...props} icon="hotel" />}
            />
        );
    }

    render() {
        const {
            addRoomModalVisible,
            addPatientModalVisible,
            addDoctorModalVisible,
            addDepartmentVisible,
            roomDetailsModalVisible,
            selectedRoom
        } = this.state;
        const { rooms, departments, doctors, patients } = this.props;
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
                <Appbar>
                    <Appbar.Content title="Rooms" subtitle="Select a room to view details" />
                </Appbar>
                <FlatList
                    data={rooms}
                    renderItem={this.renderRoom}
                    keyboardShouldPersistTaps={'handled'}
                    extraData={patients}
                />
                <AddFAB
                    addRoom={() => this.setState({ addRoomModalVisible: true })}
                    addPatient={() => this.setState({ addPatientModalVisible: true })}
                    addDoctor={() => this.setState({ addDoctorModalVisible: true })}
                    addDepartment={() => this.setState({ addDepartmentVisible: true })}
                />
                <AddRoomModal
                    reference={this.roomsRef}
                    visible={addRoomModalVisible}
                    onCancel={() => this.setState({ addRoomModalVisible: false })}
                    onAdd={() => this.setState({ addRoomModalVisible: false })}
                />
                <AddPatientModal
                    reference={this.patientsRef}
                    rooms={rooms}
                    doctors={doctors}
                    visible={addPatientModalVisible}
                    onCancel={() => this.setState({ addPatientModalVisible: false })}
                    onAdd={() => this.setState({ addPatientModalVisible: false })}
                />
                <AddDoctorModal
                    reference={this.doctorsRef}
                    departments={departments}
                    visible={addDoctorModalVisible}
                    onCancel={() => this.setState({ addDoctorModalVisible: false })}
                    onAdd={() => this.setState({ addDoctorModalVisible: false })}
                />
                <AddDepartmentModal
                    reference={this.departmentsRef}
                    visible={addDepartmentVisible}
                    onCancel={() => this.setState({ addDepartmentVisible: false })}
                    onAdd={() => this.setState({ addDepartmentVisible: false })}
                />
                <RoomDetailsModal
                    room={selectedRoom}
                    patients={patients}
                    visible={roomDetailsModalVisible}
                    onClose={() =>
                        this.setState({ roomDetailsModalVisible: false, selectedRoom: null })
                    }
                />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRooms: data => dispatch(setRooms(data)),
        setPatients: data => dispatch(setPatients(data)),
        setDoctors: data => dispatch(setDoctors(data)),
        setDepartments: data => dispatch(setDepartments(data))
    };
};

const mapStateToProps = state => ({
    rooms: state.rooms.data,
    patients: state.patients.data,
    doctors: state.doctors.data,
    departments: state.departments.data
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rooms);
