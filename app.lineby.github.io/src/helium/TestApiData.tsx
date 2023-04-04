import React from "react";

// TODO: Clean This app up
declare global {
    // DB data
    var Query: Array<[number, string, string, [number, number]]>;
    var NextID: number;

    var escapeCode: string; // 

    var LastSearchRes: Array<number>;
    var ProjMedia: Array<number>;
    var AllMedia: Array<string>;
    
    // Session Data
    var mobile: boolean;
    var ScriptQueryViewMode: boolean;
    var openProject: string;
}

/* Obsolete test data 
class TestValsE extends React.Component {
    render() {
        global.QueryId = [0];
        global.QueryText = [global.escapeCode];
        global.SelQuFilePath = [global.escapeCode];
        global.FrameNums = [];
        global.escapeCode = '-1';
        global.LastSearchRes = [1,2,3]
        global.ProjMedia = [1,3,4,6,7];
        global.AllMedia = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11', 'test12'];
        return null;
    }
}

class TestValsE2 extends React.Component {
    render () {
        global.Query = []
        global.LastSearchRes = [1,2,3]
        global.ProjMedia = [1,3,4,6,7];
        global.AllMedia = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11', 'test12'];
        return null;
    }
}

class TestVals1 extends React.Component {
    render() {
        global.QueryId = [0, 1, 2, 3, 4];
        global.QueryText = ['60 frames', '10 frames', 'Nyan Cat', 'More Nyan Cat', global.escapeCode];
        global.SelQuFilePath = ['filepath', 'filepath', global.escapeCode ,global.escapeCode, global.escapeCode];
        global.FrameNums = [[0, 60], [120, 130], [0,0], [0, 0], [0,0]];
        global.escapeCode = '-1';
        global.LastSearchRes = [1,2,3]
        global.ProjMedia = [1,3,4,6,7];
        global.AllMedia = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11', 'test12'];
        return null;
    }
}

class TestVals2 extends React.Component {
    render() {
        global.QueryId = [0, 1, 2, 3, 4];
        global.QueryText = ['60 frames', '10 frames', 'Nyan Cat', 'More Nyan Cat', global.escapeCode];
        global.SelQuFilePath = ['filepath', 'filepath', global.escapeCode ,global.escapeCode, global.escapeCode];
        global.FrameNums = [[0, 60], [120, 130], [0,0], [0, 0], [0,0]];
        global.escapeCode = '-1';
        global.LastSearchRes = [1,2,3]
        global.ProjMedia = [1,3,4,6,7];
        global.AllMedia = ['https://www.youtube.com/watch?v=fJ-QUDsRiJY', 'https://www.youtube.com/watch?v=_wIOqHSsV9c', 'https://www.youtube.com/watch?v=56K7rfVftbA', 'https://www.youtube.com/watch?v=WIFvInRA2xQ', 'https://www.youtube.com/watch?v=HkmlfHi9Ll4', 'https://www.youtube.com/watch?v=DHXBacEH0qo', 'https://www.youtube.com/watch?v=90IJanuV_0M', 'https://www.youtube.com/watch?v=3yEP4ooj1WI', 'https://www.youtube.com/watch?v=BA2qJKU8t2k', 'https://www.youtube.com/watch?v=Qy81O7LrB84', 'https://www.youtube.com/watch?v=DGAPEIxTwU4', 'https://www.youtube.com/watch?v=fp6jW8G2u7E'];
        return null;
    }
}
*/

class TestVals3 extends React.Component {
    render () {
        global.Query = [
            [0, '60 frames', 'filepath', [0, 60]],
            [1, '10 frames', 'filepath', [120, 130]], 
            [2, 'Nyan Cat', global.escapeCode, [0,0]],
            [3, 'More Nayn Cat', global.escapeCode, [0,0]],
        ]
        global.NextID = 4;

        global.LastSearchRes = [1,2,3]
        global.ProjMedia = [1,3,4,6,7];
        global.AllMedia = [
            'https://www.youtube.com/watch?v=fJ-QUDsRiJY', 
            'https://www.youtube.com/watch?v=_wIOqHSsV9c', 
            'https://www.youtube.com/watch?v=56K7rfVftbA', 
            'https://www.youtube.com/watch?v=WIFvInRA2xQ', 
            'https://www.youtube.com/watch?v=HkmlfHi9Ll4', 
            'https://www.youtube.com/watch?v=DHXBacEH0qo', 
            'https://www.youtube.com/watch?v=90IJanuV_0M', 
            'https://www.youtube.com/watch?v=3yEP4ooj1WI', 
            'https://www.youtube.com/watch?v=BA2qJKU8t2k', 
            'https://www.youtube.com/watch?v=Qy81O7LrB84', 
            'https://www.youtube.com/watch?v=DGAPEIxTwU4', 
            'https://www.youtube.com/watch?v=fp6jW8G2u7E'
        ];

        return null;
    }
}

class TestVals3v1 extends React.Component {
    render () {
        global.openProject = 'NyanCat'
        global.Query = [
            [0, '60 frames', 'filepath', [0, 60]],
            [1, '10 frames', 'filepath', [120, 130]], 
            [2, 'Nyan Cat', global.escapeCode, [0,0]],
            [3, 'More Nayn Cat', global.escapeCode, [0,0]],
        ]
        global.NextID = 0;

        global.LastSearchRes = [1,2,3]
        global.ProjMedia = [1,3,4,6,7];
        global.AllMedia = [
            'C:/Users/ganesh/workspaces/Test/test_vid/0.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/1.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/2.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/3.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/4.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/5.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/6.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/7.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/8.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/9.mp4',
            'C:/Users/ganesh/workspaces/Test/test_vid/10.mp4',
        ];

        return null;
    }  
}

class TestVals3E extends React.Component {
    render () {
        global.Query = [
        ]
        global.NextID = 0;

        global.LastSearchRes = [1,2,3]
        global.ProjMedia = [1,3,4,6,7];
        global.AllMedia = [
            'https://www.youtube.com/watch?v=fJ-QUDsRiJY', 
            'https://www.youtube.com/watch?v=_wIOqHSsV9c', 
            'https://www.youtube.com/watch?v=56K7rfVftbA', 
            'https://www.youtube.com/watch?v=WIFvInRA2xQ', 
            'https://www.youtube.com/watch?v=HkmlfHi9Ll4', 
            'https://www.youtube.com/watch?v=DHXBacEH0qo', 
            'https://www.youtube.com/watch?v=90IJanuV_0M', 
            'https://www.youtube.com/watch?v=3yEP4ooj1WI', 
            'https://www.youtube.com/watch?v=BA2qJKU8t2k', 
            'https://www.youtube.com/watch?v=Qy81O7LrB84', 
            'https://www.youtube.com/watch?v=DGAPEIxTwU4', 
            'https://www.youtube.com/watch?v=fp6jW8G2u7E'
        ];

        return null;
    }
}



export default {TestVals3, TestVals3E, TestVals3v1};