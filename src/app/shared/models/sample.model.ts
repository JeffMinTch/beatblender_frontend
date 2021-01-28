// export interface Sample {
//     queuePosition: number,
//     id: string,
//     artistName: string,
//     sampleTitle: string,
//     audioFile: string,
//     sampleImage: string,
//     audioFileDownLoadUri: string,
//     imageDownLoadUri: string,
//     genre: string,
//     trackType: string,
//     songKey: string,
//     region: string,
//     audioDescription: string,
//     sampleID: number,
//     samplePrice: string
// }
export interface Sample {
    sampleID: string;
    title: string;
    genre: string;
    tempo: number;
    moods: Array<string>;
    tags: Array<string>;
    audioFileName: string,
    imageFileName: string;
    lep: number;
    artistName: string;
}