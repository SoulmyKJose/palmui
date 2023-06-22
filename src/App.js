import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const S3BucketComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bucketFiles, setBucketFiles] = useState([]);

  useEffect(() => {
    // Initialize AWS SDK
    AWS.config.update({
      accessKeyId: 'AKIASPZAY2UYTGQO63UV',
      secretAccessKey: '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',
      region: 'ap-south-1',
    });

    // Create an S3 instance
    const s3 = new AWS.S3();

    // Define the S3 bucket name
    const bucketName = 'palmtestdata';

    // Function to list files in the S3 bucket
    const listBucketFiles = async () => {
      try {
        const response = await s3.listObjectsV2({ Bucket: bucketName }).promise();
        setBucketFiles(response.Contents);
      } catch (error) {
        console.error('Error listing bucket files:', error);
      }
    };

    // Call the listBucketFiles function to fetch the files initially
    listBucketFiles();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePayClick = async () => {
    if (selectedFile) {
      try {
        const s3 = new AWS.S3();

        const params = {
          Bucket: 'palmtestdata',
          Key: selectedFile.name,
        };

        // Get the file from AWS S3
        const response = await s3.getObject(params).promise();
        console.log(response); // Use the file data as needed
      } catch (error) {
        console.error('Error retrieving file from AWS S3:', error);
      }
    }
  };

  return (
    <div>
      <h2>CHECKOUT</h2>
      <p></p>
      <input type="file" onChange={handleFileChange} />
      <br />
      <p></p>
      <ul>
        {bucketFiles.map((file) => (
          <li key={file.Key}>{file.Key}</li>
        ))}
      </ul>
      <button onClick={handlePayClick}>Pay</button>
    </div>
  );
};

export default S3BucketComponent;


