"use strict";

// Enumerates common groups of body joints
// that you might want to examine together
// to look for patterns
define([
    'mocap/datasource/Joints'
], function (Joints) {
  
    return {
        Head: 1,
        LeftAnkle: 19,
        LeftCollar: 5,
        LeftElbow: 7,
        LeftFingertip: 10,
        LeftFoot: 20,
        LeftHand: [
            [ Joints.LeftShoulder, Joints.LeftElbow ],
            [ Joints.LeftElbow, Joints.LeftWrist ],
            [ Joints.LeftWrist, Joints.LeftHand ]
        ],
        LeftHip: 17,
        LeftKnee: 18,
        LeftShoulder: 6,
        LeftWrist: 8,
        Neck: 2,
        RightAnkle: 23,
        RightCollar: 11,
        RightElbow: 13,
        RightFingertip: 16,
        RightFoot: 24,
        RightHand: [
            [ Joints.RightShoulder, Joints.RightElbow ],
            [ Joints.RightElbow, Joints.RightWrist ],
            [ Joints.RightWrist, Joints.RightHand ]
        ],
        RightHip: 21,
        RightKnee: 22,
        RightShoulder: 12,
        RightWrist: 14,
        Torso: 3,
        Waist: 4
    };
  
});