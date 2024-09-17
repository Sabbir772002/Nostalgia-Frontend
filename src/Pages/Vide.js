import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MainWindow from './containers/MainWindow';
import CallModal from './components/CallModal';
import CallWindow from './containers/CallWindow';
import io from 'socket.io-client';
import PeerConnection from './utils/PeerConnection';
import _ from 'lodash';

const socket = io('http://localhost:5001');

let peerConnection = {};
let callConfig = null;

const Vide = () => {
    const [ClientToken, setClientToken] = useState('');
    const [callWindow, setCallWindow] = useState('');
    const [callModal, setCallModal] = useState('');
    const [CallFrom, setCallFrom] = useState('');
    const [localSrc, setLocalSrc] = useState(null);
    const [peerSrc, setPeerSrc] = useState(null);
   

    useEffect(() => {
        socket
            .on('init', ({ token: ClientToken }) => {
                document.title = `${ClientToken} - Video Call`;
                setClientToken(ClientToken);
            })
            .on('request', ({ from: CallFrom }) => {
                setCallModal('active');
                setCallFrom(CallFrom);
            })
            .on('call', data => {
                if (data.SDP) {
                    peerConnection.setRemoteDescription(data.SDP);
                    if (data.SDP.type === 'offer') {
                        peerConnection.createAnswer();
                    }
                } else {
                    peerConnection.addICECandidate(data.candidate);
                }
            })
            .on('end', () => endCallHandler(false))
            .emit('init');
    }, []);

    const startCallHandler = (isCaller, friendToken, config) => {
        callConfig = config;
        peerConnection = new PeerConnection(friendToken)
            .on('localStream', (src) => {
                setCallWindow('active');
                setLocalSrc(src);
                if (!isCaller) setCallModal('');
            })
            .on('peerStream', (src) => {
                setPeerSrc(src);
            })
            .start(isCaller, config);
    };

    const rejectCallHandler = () => {
        socket.emit('end', { to: CallFrom });
        setCallModal('');
    };

    const endCallHandler = (isStarter) => {
        if (_.isFunction(peerConnection.stop)) {
            peerConnection.stop(isStarter);
        }
        peerConnection = {};
        callConfig = null;
        setCallWindow('');
        setCallModal('');
        setLocalSrc(null);
        setPeerSrc(null);
    };

    return (
        <div>
            <MainWindow
                clientToken={ClientToken}
                startCall={startCallHandler}
            />
            {!_.isEmpty(callConfig) && (
                <CallWindow
                    callWindowStatus={callWindow}
                    localSrc={localSrc}
                    peerSrc={peerSrc}
                    config={callConfig}
                    mediaDevice={peerConnection.mediaDevice}
                    clientToken={ClientToken}
                    friendToken={CallFrom}
                    endCall={() => endCallHandler()}
                />
            )}
            <CallModal
                status={callModal}
                callFrom={CallFrom}
                startCall={startCallHandler}
                rejectCall={() => rejectCallHandler()}
            />
        </div>
    );
};

export default Vide;
