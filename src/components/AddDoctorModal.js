import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Button, Card, Divider, Modal, Portal, TextInput } from 'react-native-paper';
import { COLORS } from '../styles/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class AddDoctorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorName: ''
        };
        this.addDoctor = this.addDoctor.bind(this);
    }

    addDoctor() {
        const { reference, onAdd } = this.props;
        const { doctorName } = this.state;
        reference.add({
            name: doctorName
        });
        onAdd();
    }

    render() {
        const { onCancel, visible } = this.props;
        const { doctorName } = this.state;
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
                        <Card.Title title="Add Doctor" subtitle="Enter the doctor name" />
                        <Divider />
                        <Card.Content>
                            <TextInput
                                label="Doctor Name"
                                value={doctorName}
                                mode={'outlined'}
                                onChangeText={text => this.setState({ doctorName: text })}
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
                                onPress={this.addDoctor}
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

export default AddDoctorModal;
