import { PropObserver } from '../utils/prop-observer';

interface ICamera {

    stream?: PropObserver;
    devices?: 

};

export async function useCamera (): Promise<any> {

    const camera: ICamera = {

        stream: new PropObserver(null),


    };

    // navigator.mediaDevices.getUserMedia( { video: true, audio: false } )
    //     .then(function( stream: MediaStream ) {

            

    //     })
    //     .catch(function(err) {
    //         console.log("An error occurred: " + err);
    //     });


}
