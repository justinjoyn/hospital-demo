import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Button, Card, Divider, Modal, Portal, TextInput } from 'react-native-paper';
import { COLORS } from '../styles/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class AddPatientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            department: null,
            room: null,
            doctor: null
        };
    }

    render() {
        const { onAdd, onCancel, visible } = this.props;
        const { patientName, department, room, doctor } = this.state;
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
                    onDismiss={onCancel}>
                    <Card
                        theme={{
                            colors: {
                                surface: COLORS.white
                            }
                        }}>
                        <Card.Title title="Add Patient" subtitle="Enter the patient name" />
                        <Divider />
                        <Card.Content>
                            <TextInput
                                label="Patient Name"
                                value={patientName}
                                mode={'outlined'}
                                onChangeText={text => this.setState({ patientName: text })}
                                style={{ marginBottom: 10 }}
                                theme={{ colors: { primary: COLORS.black } }}
                            />
                        </Card.Content>
                        <Card.Actions
                            style={{
                                justifyContent: 'space-between',
                                paddingBottom: 30
                            }}>
                            <Button
                                theme={{ colors: { primary: COLORS.black } }}
                                onPress={onCancel}>
                                Cancel
                            </Button>
                            <Button
                                onPress={() => onAdd(patientName, department, room, doctor)}
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
