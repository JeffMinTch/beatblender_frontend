// import { AudioFile } from './audio-file.model';
import { SampleDetails } from "./sample-details.model";

// export interface AudioFile {
//     id: string,
//     url: string,
//     img: string,
//     title: string,
//     artist: string,
//     // length: string
//     userName: string,
//     samplePrice: number,
//     sampleID: number,
//     sampleDetails: SampleDetails,
    
// }


export interface Sample {
    queuePosition: number,
    id: string,
    artistName: string,
    sampleTitle: string,
    audioFile: string,
    sampleImage: string,
    audioFileDownLoadUri: string,
    imageDownLoadUri: string,
    genre: string,
    trackType: string,
    songKey: string,
    region: string,
    audioDescription: string,
    sampleID: number,
    samplePrice: string
}
