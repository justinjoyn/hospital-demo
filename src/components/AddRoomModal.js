import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Button, Card, Divider, Modal, Portal, TextInput } from 'react-native-paper';
import { COLORS } from '../styles/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class AddRoomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomNo: ''
        };
    }

    render() {
        const { onAdd, onCancel, visible } = this.props;
        const { roomNo } = this.state;
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
                        <Card.Title title="Add Room" subtitle="Enter the room number" />
                        <Divider />
                        <Card.Content>
                            <TextInput
                                label="Room No"
                                value={roomNo}
                                mode={'outlined'}
                                onChangeText={text => this.setState({ roomNo: text })}
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
                                onPress={() => onAdd(roomNo)}
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

export default AddRoomModal;
