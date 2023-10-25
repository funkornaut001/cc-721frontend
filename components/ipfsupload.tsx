import { useCallback, useState } from 'react';
import { useStorageUpload, MediaRenderer } from '@thirdweb-dev/react';
import { NextPage } from "next";
import { useDropzone } from 'react-dropzone';    

// interface IpfsUploadProps {
//     // Define any props you need here
// }

const IpfsUpload: NextPage = () => {
    const [uris, setUris] = useState<string[]>([]);

    const { mutateAsync: upload } = useStorageUpload();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const uris = await upload({ data: acceptedFiles });
            setUris(uris);
        },
        [upload]
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
    <div>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button>Upload</button>
        </div>
        <div>
            {uris.map((uri) => {
                return <MediaRenderer key={uri} src={uri} alt="image" width="400px"/>;
            })}
        </div>
    </div>
    );
};

export default IpfsUpload;
