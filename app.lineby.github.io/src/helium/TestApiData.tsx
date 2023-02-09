import React from "react";

declare global {
    var QueryId: Array<number>; //UID
    var QueryText: Array<string>; // Text input 
    var SelQuFilePath: Array<string>; // Query Selected video file path
    var FrameNums: Array<[number, number]>; // Found [start, end] frame numbers for 

    var escapeCode: string; //  

    var AllMedia: Array<string>;
    var ProjMedia: Array<string>;
}

class TestVals1 extends React.Component {
    render() {
        global.QueryId = [0, 1, 2, 3, 4];
        global.QueryText = ['60 frames', '10 frames', 'Nyan Cat', 'More Nyan Cat', global.escapeCode];
        global.SelQuFilePath = ['filepath', 'filepath', global.escapeCode ,global.escapeCode, global.escapeCode];
        global.FrameNums = [[0, 60], [120, 130], [0,0], [0, 0], [0,0]];
        global.ProjMedia = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9'];
        global.AllMedia = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11', 'test12'];
        return null;
    }

}

export default {TestVals1};