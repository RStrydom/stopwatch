import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import formatTime from 'minutes-seconds-milliseconds'

class stopwatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: null,
            timeElapsed: null,
            running: false,
            laps: [],
        };

        this.handleStartPress = this.handleStartPress.bind(this)
        this.handleLapPress = this.handleLapPress.bind(this)
    }


    handleStartPress() {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({
                running: false,
            });
            return;
        }

        this.setState({
            startTime: new Date(),
            laps: [],
        });

        this.interval = setInterval(() => {
            this.setState({
                timeElapsed: new Date() - this.state.startTime,
                running: true,
            })
        }, 30);
    }

    handleLapPress() {
        if (!this.state.running) {
            return;
        }

        let lap = this.state.timeElapsed;

        this.setState({
            startTime: new Date(),
            laps: this.state.laps.concat(
                [<Lap
                    lapTime={lap}
                    lapNum={this.state.laps.length + 1}
                    key={this.state.laps.length}
                />]
            ),
        })
    }

    render() {
        let startStopButton = this.state.running ? styles.stopButton : styles.startButton;
        let startStopColor = this.state.running ? 'rgba(255, 65, 54, 0.5)' : 'rgba(14, 62, 20, 1)';
        return (
          <LinearGradient colors={['#537895', '#09203f']} start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.timerWrapper}>
                    <Text style={styles.timer}>
                        {formatTime(this.state.timeElapsed)}
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableHighlight underlayColor={startStopColor} onPress={this.handleStartPress} style={[styles.button, startStopButton]}>
                        <Text style={styles.buttonText}>
                            {this.state.running ? 'Stop' : 'Start'}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(0, 116, 217, 0.4)" onPress={this.handleLapPress} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Lap
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView style={styles.footer}>
                <View style={styles.laps}>
                    {this.state.laps}
                </View>
            </ScrollView>
          </LinearGradient>
        );
    }
}

class Lap extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.lap}>
                <Text style={styles.lapNum}>
                    #{this.props.lapNum}
                </Text>
                <Text style={styles.lapTime}>
                    {formatTime(this.props.lapTime)}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    header: {
        flex: 1,
    },
    footer: {
        flex: 1,
    },
    timerWrapper: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    timer: {
        color: '#FFF',
        fontSize: 80,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
    },
    startButton: {
        borderColor: 'rgba(46, 204, 64, 0.5)',
    },
    stopButton: {
        borderColor: 'rgba(255, 65, 54, 0.5)',
    },
    laps: {
        padding: 20,
    },
    lap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    lapNum: {
        fontSize: 20,
        color: '#DDD',
        fontWeight: '700',
    },
    lapTime: {
        fontSize: 20,
        color: '#DDD',
        fontWeight: '700',
    }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
