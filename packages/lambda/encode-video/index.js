require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION
});

const transcoder = new AWS.ElasticTranscoder();

const presets = [
  process.env.PRESET_ID_AUDIO_128k,
  process.env.PRESET_ID_VIDEO_600k,
  process.env.PRESET_ID_VIDEO_1200k,
  process.env.PRESET_ID_VIDEO_2400k,
  process.env.PRESET_ID_VIDEO_4800k
];
const outputKeys = ["audio", "600K", "1200K", "2400K", "4800K"];
const segmentDuration = "5";
const thumbPattern = "thumbnail_{count}";

function makeOutputs() {
  return outputKeys.map((outputKey, index) => {
    const output = {
      Key: outputKey,
      PresetId: presets[index],
      SegmentDuration: segmentDuration
    };

    if (outputKey !== "audio") {
      output.ThumbnailPattern = thumbPattern + outputKey;
    }

    return output;
  });

  // return outputKeys.reduce((acc, outputKey, index) => {
  //   const output = {
  //     Key: outputKey,
  //     PresetId: presets[index],
  //     SegmentDuration: segmentDuration
  //   };

  //   if (outputKey !== "audio") {
  //     output.ThumbnailPattern = thumbPattern + outputKey;
  //   }

  //   return [...acc, output];
  // }, []);
}

exports.handler = async (event, context, callback) => {
  const { Records } = event;

  const s3 = Records[0].s3;
  const bucket = s3.bucket;
  const object = s3.object;
  const inputKey = object.key;

  const extensionRemovedPath = inputKey.split(".")[0].split("/");
  const fileName = extensionRemovedPath[extensionRemovedPath.length - 1];

  const path = inputKey.split("/");
  path.splice(path.length - 1, 1);

  const outputKey = path.join("/");

  // const outputKey = path.reduce((acc, cur) => {
  //   return `${acc}/${cur}`;
  // });

  const playlistName = fileName;

  const params = {
    PipelineId: process.env.PIPELINE_ID,
    Input: {
      Key: inputKey,
      AspectRatio: "auto",
      FrameRate: "auto",
      Resolution: "auto",
      Container: "auto",
      Interlaced: "auto"
    },
    OutputKeyPrefix: `${outputKey}/`,
    Outputs: makeOutputs(),
    Playlists: [
      {
        Name: playlistName,
        Format: "MPEG-DASH",
        OutputKeys: outputKeys
      }
    ]
  };

  console.log(params);

  const request = transcoder.createJob(params);
  request.on("success", function(response) {
    console.log("success");
    console.log(response);
  });
  request.on("error", function(err, response) {
    if (err) {
      console.log("error");
      console.log(err);
      console.log(response);
    }
  });

  request.send();

  callback(null, true);
};
