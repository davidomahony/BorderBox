import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./ImageCropper.css";
import { IonButton } from "@ionic/react";

type State = {
    imageDestination: string
}


class ImageCropper extends React.Component<{
    src: string, 
    updateCroppedPreview: (img: any) =>  void
    updateCrop: (img: any) =>  void}, State, string> {
    constructor(props: any) {
      super(props);
        this.state = {
            imageDestination: ""
        };
        this.imageElement = React.createRef();
    }

    imageElement : any =  React.createRef();

    componentDidMount() {
        const cropper = new Cropper(this.imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                this.setState({ imageDestination: canvas.toDataURL("image/png") });
                this.props.updateCroppedPreview(this.state.imageDestination)
            }
        });
    }

    render() {
        return (
            <div>
                <div className="img-container">
                    <img ref={this.imageElement} src={this.props.src} alt="Source" />
                </div>
                <img src={this.state.imageDestination} className="img-preview" alt="Destination" />
            </div>
        );
    }

}

export default ImageCropper;

export function AutoCropper(img: any) {
    let result  :any = null
    const cropper = new Cropper(img, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
            const canvas = cropper.getCroppedCanvas();
            result = canvas.toDataURL("image/png");
        }
    });
    return result;
}