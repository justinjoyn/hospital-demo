import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import {
    Button,
    Card,
    Chip,
    Divider,
    Modal,
    Portal,
    Subheading,
    TextInput
} from 'react-native-paper';
import { COLORS } from '../styles/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class AddPatientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            selectedRoom: null,
            selectedDoctor: null
        };
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
        this.renderDoctors = this.renderDoctors.bind(this);
        this.renderRooms = this.renderRooms.bind(this);
    }

    add = async () => {
        const { reference, onAdd } = this.props;
        const { patientName, selectedRoom, selectedDoctor } = this.state;
        if (patientName === '' || !selectedRoom || !selectedDoctor) return;
        let newPatientRef = await reference.add({
            name: patientName,
            room: selectedRoom.doc.ref,
            doctor: selectedDoctor.doc.ref
        });
        selectedRoom.doc.ref.update({
            patient: newPatientRef
        });
        this.setState({ patientName: '', selectedRoom: null, selectedDoctor: null });
        onAdd();
    };

    cancel() {
        const { onCancel } = this.props;
        this.setState({ patientName: '', department: null, room: null, doctor: null });
        onCancel();
    }

    renderDoctors() {
        const { doctors } = this.props;
        if (!doctors) return;
        const { selectedDoctor } = this.state;
        let renderedDoctors = [];
        doctors.map(doctor => {
            const isSelected = selectedDoctor && selectedDoctor.key === doctor.key ? true : false;
            renderedDoctors = renderedDoctors.concat(
                <Chip
                    key={doctor.key}
                    style={{ marginRight: 8, marginBottom: 8 }}
                    icon="business"
                    onPress={() => this.setState({ selectedDoctor: doctor })}
                    mode={'outlined'}
                    selected={isSelected}>
                    {doctor.name}
                </Chip>
            );
        });
        return renderedDoctors;
    }

    renderRooms() {
        const { rooms } = this.props;
        if (!rooms) return;
        const { selectedRoom } = this.state;
        let renderedRooms = [];
        rooms.map(room => {
            const isSelected = selectedRoom && selectedRoom.key === room.key ? true : false;
            renderedRooms = renderedRooms.concat(
                <Chip
                    key={room.key}
                    style={{ marginRight: 8, marginBottom: 8 }}
                    icon="hotel"
                    onPress={() => this.setState({ selectedRoom: room })}
                    mode={'outlined'}
                    selected={isSelected}>
                    {room.number}
                </Chip>
            );
        });
        return renderedRooms;
    }

    render() {
        const { visible } = this.props;
        const { patientName } = this.state;
        return (
            <Portal>
                <Modal
                    contentContainerStyle={{
                        height: SCREEN_HEIGHT,
                        justifyContent: 'flex-end'
                    }}
                    theme={{
                        colors: {
                            backdrop: COLORS.blackTransparent
                        }
                    }}
                    visible={visible}
                    onDismiss={this.cancel}>
                    <Card
                        theme={{
                            colors: {
                                surface: COLORS.white
                            }
                        }}>
                        <Card.Title title="Add Patient" subtitle="Provide the details" />
                        <Divider />
                        <ScrollView
                            style={{ height: SCREEN_HEIGHT / 1.5 }}
                            keyboardShouldPersistTaps={'handled'}>
                            <Card.Content>
                                <TextInput
                                    label="Patient Name"
                                    value={patientName}
                                    mode={'outlined'}
                                    onChangeText={text => this.setState({ patientName: text })}
                                    style={{ marginBottom: 10 }}
                                    theme={{ colors: { primary: COLORS.black } }}
                                />
                                <Subheading>Doctor</Subheading>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {this.renderDoctors()}
                                </View>
                                <Subheading>Room</Subheading>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {this.renderRooms()}
                                </View>
                            </Card.Content>
                        </ScrollView>
                        <Card.Actions
                            style={{
                                justifyContent: 'space-between',
                                paddingBottom: 30
                            }}>
                            <Button
                                theme={{ colors: { primary: COLORS.black } }}
                                onPress={this.cancel}>
                                Cancel
                            </Button>
                            <Button
                                onPress={this.add}
                                theme={{ colors: { primary: COLORS.black } }}>
                                Add
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        );
    }
}

export default AddPatientModal;
