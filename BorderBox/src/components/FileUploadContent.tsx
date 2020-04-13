import React from 'react';

import { removeCircle } from 'ionicons/icons'

import './FileUpload.scss'
import ImageUploader from 'react-images-upload';
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItemDivider,
  IonSlide,
  IonSlides,
  IonText,
  IonCol,
  IonRow,
  IonImg,
  IonIcon
} from "@ionic/react";

import CropModal from './CropModal'

type SelectedImage = {
  identifier: string,
  selectImagePath: string,
  croppedImagePath: string,
  quantity: number
}
type State = {
  isCropModalVisible: boolean,
  imageSourceForCrop: string,
  selectedImageIdentifier: string
}

export class FileUploadContent extends React.Component<{
  activePhotos: SelectedImage[],
  uploadPhoto: (identifier: string, path: string[] ) => void,
  removePhoto: (identifier: string, path: string ) => void,
  updateFromCrop: (img: any, id: string ) => void
}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
        isCropModalVisible: false,
        imageSourceForCrop: '',
        selectedImageIdentifier: ''
      }
  }

  handleOnImageChange = (pictureFiles: any, pictureDataURLs: any) =>
  {
    this.props.uploadPhoto(`${this.props.activePhotos.length + 1}`, pictureDataURLs);
  }

  showCropModal = (image: SelectedImage) =>{
    this.setState({
      isCropModalVisible: true,
      imageSourceForCrop: image.selectImagePath,
      selectedImageIdentifier: image.identifier
    })
  }

  closeCropModal = (returnedImage: any) =>{
    this.setState({
      isCropModalVisible: false
    })
  }

  updateFromCropModal = (img: any, identifier: string) =>{
    this.props.updateFromCrop(img, identifier);
  }

  DisplayUploadedPhotos(){
    let windowWidth = window.innerWidth;
    return this.props.activePhotos.map(photo =>
      <div className="class" key={photo.identifier}>
        <IonCard key={photo.identifier}>
        <img src={photo.croppedImagePath}></img>
        <IonCardHeader>
            <IonCardTitle>
                Price $12.99
            </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            <IonButton onClick={() => this.props.removePhoto(photo.identifier, photo.selectImagePath)}>
            <IonIcon src={removeCircle}></IonIcon>
            </IonButton>
            <IonButton onClick={() => this.showCropModal(photo)}>
              Crop & Resize
            </IonButton>
          </IonRow>
        </IonCardContent>
        </IonCard>
      </div>)
  }

  //        {/* <img src={photo.selectImagePath}></img>
  //      <IonCardContent>
  //        <IonCol>
//            <IonRow>
  //            <IonImg src={photo.selectImagePath}></IonImg>
    //        </IonRow>
      //      <IonRow>
       //       <IonButton onClick={() => this.props.removePhoto(photo.identifier, photo.selectImagePath)}>
        //      <IonIcon src={removeCircle}></IonIcon>
         //     </IonButton>
        //    </IonRow>
  //        </IonCol>
    //    </IonCardContent> */}

  render() {
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Pick Photos
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <CropModal 
                updateFromCrop={this.updateFromCropModal} 
                imgIdentifier={this.state.selectedImageIdentifier}
                isVisible={this.state.isCropModalVisible} 
                imageSource={this.state.imageSourceForCrop} 
                closeModal={this.closeCropModal} >
              </CropModal>
            <IonItemDivider>
              <IonRow>
                  Number of Photos: {this.props.activePhotos.length} 
              </IonRow>
            </IonItemDivider>
              {this.DisplayUploadedPhotos()}
              <IonCard className="addCard">
                <IonCardContent>
                  <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.handleOnImageChange}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    />
                </IonCardContent>
              </IonCard>
            </IonCardContent>
        </IonCard>
    )
 }
}

export default FileUploadContent